
// Logic for Shadow Talk (Blind Identity Reveal)
const SHADOW_KEY = 'insomnia_shadow_talk';

export const getShadowThoughts = () => {
  return JSON.parse(localStorage.getItem(SHADOW_KEY)) || [];
};

export const postShadowThought = (content, user) => {
  const thoughts = getShadowThoughts();
  const newThought = {
    id: Date.now().toString(),
    content,
    authorId: user.id || user.name, // using name as id for demo if real id missing
    authorName: user.name,
    alias: `Shadow_${Math.floor(Math.random() * 9000) + 1000}`,
    replies: [],
    reveals: [], // userIds who want to reveal to the author
    createdAt: Date.now()
  };
  thoughts.unshift(newThought);
  localStorage.setItem(SHADOW_KEY, JSON.stringify(thoughts));
  return newThought;
};

export const replyToShadowThought = (thoughtId, content, user) => {
  const thoughts = getShadowThoughts();
  const index = thoughts.findIndex(t => t.id === thoughtId);
  if (index !== -1) {
    const newReply = {
      id: Date.now().toString(),
      content,
      authorId: user.id || user.name,
      authorName: user.name,
      alias: `Reply_${Math.floor(Math.random() * 9000) + 1000}`,
      reveals: [], // userIds who want to reveal to this replier
      createdAt: Date.now()
    };
    thoughts[index].replies.push(newReply);
    localStorage.setItem(SHADOW_KEY, JSON.stringify(thoughts));
  }
};

export const requestReveal = (thoughtId, replyId, userId) => {
  const thoughts = getShadowThoughts();
  const tIndex = thoughts.findIndex(t => t.id === thoughtId);
  if (tIndex === -1) return;

  if (replyId) {
    // Reveal request for a reply
    const rIndex = thoughts[tIndex].replies.findIndex(r => r.id === replyId);
    if (rIndex !== -1) {
      if (!thoughts[tIndex].replies[rIndex].reveals.includes(userId)) {
        thoughts[tIndex].replies[rIndex].reveals.push(userId);
      }
    }
  } else {
    // Reveal request for the main thought
    if (!thoughts[tIndex].reveals.includes(userId)) {
      thoughts[tIndex].reveals.push(userId);
    }
  }
  localStorage.setItem(SHADOW_KEY, JSON.stringify(thoughts));
};
