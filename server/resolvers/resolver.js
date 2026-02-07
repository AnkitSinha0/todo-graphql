import Todo from "../models/todoModel.js";

const resolvers = {
    Query:{
        todos: async () => {
            return await Todo.find();
        }
    },
    Mutation:{
        addTodo: async (_, {title}) => {
            const newTodo  = Todo.create({title});
            return newTodo;
        }
    }
}

export default resolvers;
