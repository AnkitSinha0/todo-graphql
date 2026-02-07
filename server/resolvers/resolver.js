import Todo from "../models/todoModel.js";
 

const resolvers = {
  Query: {
    todos: async () => {
      return await Todo.find();
    },
  },
  Mutation: {
    addTodo: async (_, { data }) => {
      const todo = new Todo({
        title: data.title,
      });
      return await todo.save();
    },toggleTodo: async (_, { id }) => {
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    todo.completed = !todo.completed;
    return await todo.save();
  },
    deleteTodo: async (_, { id }) => {
  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    throw new Error("Todo not found");
  }
  return true;
}

  },
  
};

export default resolvers;
