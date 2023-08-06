const User = require('../models/user');
const Habit = require('../models/habit');
const habitRouter = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

habitRouter.get('/',async(request, response) => {
    try{
        const habit = await Habit.find({})
        response.json(habit)
    }catch(error){
        console.log(error)
    }
})

habitRouter.get('/:userId',async(request,response)=>{
    const userId = request.params.userId;
    try{
        const habit = await Habit.find({user: userId});

        if(habit.length === 0) {
            return response.status(404).json({error: 'No habits found for this user'});
        }
        
        response.json(habit);
    }catch(error) {
        console.error(error);
        response.status(500).json({error: 'Server Error'});
    }
    
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

habitRouter.post('/', async (request, response) => {
  const { habitName, habitDescription, startDate} = request.body;
  const decodedToken = jwt.decode(getTokenFrom(request),'your_secret_key');
  const userId = decodedToken.userId;
  try {
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return response.status(400).json({ error: 'Invalid userId format' });
    }

    // Find the user by the provided userId
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const habit = new Habit({
      habit: habitName,
      description: habitDescription,
      startDate: startDate,
      user: user.id,
    });
    const savedHabit = await habit.save();
    user.habits = user.habits.concat(savedHabit._id);
    await user.save();

    response.json(savedHabit);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Server error' });
  }
});

habitRouter.put('/:id',async(request, response, next) => {
  try{
    const updatedHabit=await Habit.findByIdAndUpdate(request.params.id, {...request.body},{new:true} );
    response.json(updatedHabit);
  }catch(error) {
    next(error);
  }
})

habitRouter.delete('/:id',async (request,response, next)=>{
  try{
    await Habit.findByIdAndRemove(request.params.id)

    response.status(204).end() //204 status means no content, return no data as it is deleted
  } 
  catch(error){
    next(error);
  }

})

module.exports = habitRouter;
