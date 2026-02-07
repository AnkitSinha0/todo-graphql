"use client";
import { Chain } from "@/zeus";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { useState ,useEffect } from "react";
import { title } from "process";
const chain = Chain("http://localhost:5000/graphql");

export default function Home() {
 const [todos, setTodos] = useState([]);
 const [title, setTitle] = useState("");

  const loadTodos = async () => {
    const data = await chain("query")({
      todos: {
        id: true,
        title: true,
        completed: true,
      },
    });

    setTodos(data.todos);
  };
   useEffect(() => {
    loadTodos();
  }, []);
  const toggleTodo = async (id: string) => {
  await chain("mutation")({
    toggleTodo: [
      { id },            
      {
        id: true,
        completed: true
      }
    ]
  });

  loadTodos(); 
};

const deleteTodo = async (id: string) => {
  await chain("mutation")({
    deleteTodo: [
      { id },
      true
      
    ]
  });

  loadTodos(); // refresh list
};
const addTodo = async () => {
  if (!title.trim()) return;

  await chain("mutation")({
    addTodo: [
      { data: { title } },
      {
        id: true,
        title: true,
        completed: true
      }
    ]
  });

  setTitle("");
  loadTodos(); // refresh list
};



  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">

      {/* Navbar */}
      <div className="flex justify-between items-center border border-zinc-700 rounded-lg px-6 py-3 mb-6">
        <h1 className="font-bold">Todo GQL</h1>

        <div className="flex gap-6">
          <span>Home</span>
          <span>Signup</span>
          <span>Signin</span>
        </div>
      </div>

      {/* Main Card */}
      <Card className="bg-zinc-900 border-zinc-700 text-white">
        <CardContent className="pt-6 text-white">

          {/* Create Button */}
         <Dialog>
  <DialogTrigger asChild>
    <Button className="mb-4">
      Create a new todo
    </Button>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Todo</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
      <Input
        placeholder="Enter todo title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button onClick={addTodo} className="w-full">
        Add Todo
      </Button>
    </div>
  </DialogContent>
</Dialog>


          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">S.no</TableHead>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Delete</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {todos.map((todo, index) => (
                <TableRow key={todo.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{todo.title}</TableCell>

                  {/* Boolean Toggle */}
                  <TableCell>
                    <Switch
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                    />
                  </TableCell>

                  {/* Delete */}
                  <TableCell>
                    <Trash2
                      className="cursor-pointer text-red-500 hover:scale-110"
                      onClick={() => deleteTodo(todo.id)}
                    />
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>

        </CardContent>
      </Card>

    </div>
  );
}
