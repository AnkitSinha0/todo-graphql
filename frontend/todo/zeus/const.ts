/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	AddTodoInput:{

	},
	Mutation:{
		addTodo:{
			data:"AddTodoInput"
		},
		toggleTodo:{

		},
		deleteTodo:{

		}
	},
	ID: `scalar.ID` as const
}

export const ReturnTypes: Record<string,any> = {
	Todo:{
		id:"ID",
		title:"String",
		completed:"Boolean"
	},
	Query:{
		todos:"Todo"
	},
	Mutation:{
		addTodo:"Todo",
		toggleTodo:"Todo",
		deleteTodo:"Boolean"
	},
	ID: `scalar.ID` as const
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}