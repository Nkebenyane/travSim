import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash'
import { v4 } from "uuid";

const item = {
    id: v4(),
    name: "change backgroud color"
}

const item2 = {
    id: v4(),
    name: "add css to home page, keep in mind to be responsive"
}

function ToDoList() {
    const [text, setText] = useState("")
    const [state, setState] = useState({
        "todo": {
            title: "Todo",
            items: [item, item2]
        },
        "progress": {
            title: "In Progress",
            items: []
        },
        "done": {
            title: "Completed",
            items: []
        }
    })

    const handleDragEnd = ({ destination, source }) => {
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }
        const Copy = { ...state[source.droppableId].items[source.index] }

        setState(prev => {
            prev = { ...prev }
            prev[source.droppableId].items.splice(source.index, 1)
            prev[destination.droppableId].items.splice(destination.index, 0, Copy)
            return prev
        })
    }

    const addItem = () => {
        setState(prev => {
            return {
                ...prev,
                todo: {
                    title: "Todo",
                    items: [
                        {
                            id: v4(),
                            name: text
                        },
                        ...prev.todo.items
                    ]
                }
            }
        })
        setText("")
    }
  
    const deleteItem = (title,id) => {
        
        if(title === 'Todo'){
            console.log(title);
            state.todo.items.splice(id, 1);
            setState({todo: state.todo, done: state.done, progress: state.progress});
        }
        else if(title === 'In Progress'){
            console.log(state.progress.items);
            state.progress.items.splice(id,1);
            setState({todo: state.todo, done: state.done, progress: state.progress});        }
        else if(title === 'Completed'){
            console.log(title);
            state.done.items.splice(id, 1);
            setState({todo: state.todo, done: state.done, progress: state.progress});        }
    };

    return (
        <div className="Todo-container">
            <div className="header">
                <h1>ToDo List </h1>
                <input className="Form-Input" placeholder="Add To Do ..." type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button className="Addbtn" onClick={addItem}>Add</button>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(state, (data, key) => {
                    return (
                        <div key={key} className={"column"}>
                            <p className="title">{data.title}</p>
                            <Droppable droppableId={key}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={"droppable-col"}
                                        >
                                            {data.items.map((el, index) => {
                                                return (
                                                    <Draggable key={el.id} index={index} draggableId={el.id}>
                                                        {(provided, snapshot) => {
                                                            console.log(snapshot)
                                                            return (
                                                                <div
                                                                    className={`item ${snapshot.isDragging && "dragging"}`}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <p>{el.name}</p>
                                                                    <span> <button className="dltbtn" type="button" onClick={(e) => deleteItem(data.title, index)}>delete</button> </span>
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
    );
}
export default ToDoList;