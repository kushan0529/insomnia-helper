const nightMode = (req, res, next) => {
  const currentHour = new Date().getHours();
  
  // Night shift is open between 10PM (22) and 4AM (4)
  const isNightShift = currentHour >= 22 || currentHour < 4;

  if (req.room && req.room.isNightOwlRoom && !isNightShift) {
    return res.status(403).json({ 
      message: 'The Night Shift is currently closed. Opens at 10PM.' 
    });
  }
  next();
};

module.exports = nightMode;
