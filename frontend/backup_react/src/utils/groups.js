
// Logic for handling groups using localStorage

const GROUPS_KEY = 'insomnia_groups';
const USER_KEY = 'insomnia_user';

// Initialize defaults if they don't exist
if (!localStorage.getItem(GROUPS_KEY)) {
  localStorage.setItem(GROUPS_KEY, JSON.stringify([]));
}

// Current User Helper
export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  if (!user) {
    // Return a dummy user if not logged in for demo purposes
    // In a real app, this would come from auth state
    return {
      name: "Guest User",
      avatar_initials: "GU",
      joinedGroups: [],
      hostedGroups: []
    };
  }
  return JSON.parse(user);
};

export const setCurrentUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Group Operations
export const getGroups = () => {
  return JSON.parse(localStorage.getItem(GROUPS_KEY)) || [];
};

export const getGroup = (id) => {
  const groups = getGroups();
  return groups.find(g => g.id === id);
};

export const createGroup = (data) => {
  const groups = getGroups();
  const user = getCurrentUser();
  
  const newGroup = {
    id: Date.now().toString(),
    ...data,
    host: {
      name: user.name,
      avatar_initials: user.avatar_initials
    },
    members: [
      { name: user.name, avatar_initials: user.avatar_initials, status: 'approved' }
    ],
    createdAt: Date.now()
  };
  
  groups.push(newGroup);
  localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  
  // Update user's hosted groups
  user.hostedGroups = user.hostedGroups || [];
  user.hostedGroups.push(newGroup.id);
  setCurrentUser(user);
  
  return newGroup;
};

export const requestToJoin = (groupId, user) => {
  const groups = getGroups();
  const index = groups.findIndex(g => g.id === groupId);
  
  if (index !== -1) {
    // Check if already a member or pending
    const existing = groups[index].members.find(m => m.name === user.name);
    if (existing) return;
    
    groups[index].members.push({
      name: user.name,
      avatar_initials: user.avatar_initials,
      status: 'pending'
    });
    
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
    
    // Update local user's joined groups
    const currentUser = getCurrentUser();
    currentUser.joinedGroups = currentUser.joinedGroups || [];
    if (!currentUser.joinedGroups.includes(groupId)) {
        currentUser.joinedGroups.push(groupId);
        setCurrentUser(currentUser);
    }
  }
};

export const approveRequest = (groupId, userName) => {
  const groups = getGroups();
  const groupIndex = groups.findIndex(g => g.id === groupId);
  
  if (groupIndex !== -1) {
    const memberIndex = groups[groupIndex].members.findIndex(m => m.name === userName);
    if (memberIndex !== -1) {
      groups[groupIndex].members[memberIndex].status = 'approved';
      localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
    }
  }
};

export const declineRequest = (groupId, userName) => {
  const groups = getGroups();
  const groupIndex = groups.findIndex(g => g.id === groupId);
  
  if (groupIndex !== -1) {
    groups[groupIndex].members = groups[groupIndex].members.filter(m => m.name !== userName);
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  }
};
