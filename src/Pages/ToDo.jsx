import { Calendar, Check, Menu, Plus } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

export default function ToDo() {
    const inputRef = useRef(null)


    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos")
        return saved ? JSON.parse(saved) : []
    })


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
        }, [todos]
    )


    const addTodo = () => {
        const value = inputRef.current.value.trim()
        if (!value) {
            return ""
        }


        setTodos([
            ...todos,
            {
                id: Date.now(),
                text: value,
                completed: false
            },
        ])


        inputRef.current.value = ""
        inputRef.current.focus()
    }


    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id? { ...todo, completed: !todo.completed }: todo
            )
        )
    }


    const todoList = todos.filter((todo) => !todo.completed)
    const completedList = todos.filter((todo => todo.completed))

    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-blue-900'>
            <div className='w-90 rounded-3xl bg-slate-800/90 shadow-xl p-6 text-white'>


                <div className='flex items-center justify-between mb-6'>
                    <button ><Menu className='text-slate-400' /></button>
                    <h1 className='text-sm tracking-widest text-slate-300'><span className='text-amber-400'>✦</span>CHORES</h1>
                </div>


                <div className='flex items-center gap-3 bg-slate-700/60 rounded-xl px-4 py-3 mb-6'>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder='Add Item'
                        className='flex-1 bg-transparent outline-none placeholder:text-slate-400 text-sm' />


                    <button onClick={addTodo}><Plus className='w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-lg' /></button>
                </div>


                <div className='mb-6'>
                    <h2 className='text-xs text-slate-400 tracking-widest mb-3'>TO DO</h2>


                    <div className="space-y-3">
                        {todoList.map(
                            (todo) => (
                                <div
                                    key={todo.id}
                                    className="flex items-center justify-between bg-slate-700/50 rounded-xl px-4 py-3"
                                >
                                    <div className="flex items-center gap-3" onClick={() => toggleTodo(todo.id)}>
                                        <span className="w-4 h-4 rounded-full border border-slate-400"></span>
                                        <span className="text-sm">{todo.text}</span>
                                    </div>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Calendar className='w-4 h-4' /> Due today
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>


                <div>
                    <h2 className="text-xs text-slate-400 tracking-widest mb-3">
                        COMPLETED
                    </h2>
                    <div className="space-y-3">
                        {completedList.map((todo) => (
                            <div
                                key={todo.id}
                                className="flex items-center justify-between bg-slate-700/40 rounded-xl px-4 py-3 opacity-70"
                            >
                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                                    <span className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center text-xs">
                                        <Check className='w-2 h-2' />
                                    </span>
                                    <span className="text-sm line-through">{todo.text}</span>
                                </div>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Calendar className='w-4 h-4' /> Due today
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


