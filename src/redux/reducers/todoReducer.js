// 초기 상태 정의
const initialState = {
    todos: [{
        id: 213,
        title: 'Create the main page design',
        description: 'Eldest father can design tastes did joy settle. Roused future he ye an marked. Arose mr rapid '
            + 'in so vexed words. Gay welcome led add lasting chiefly say looking. ',
        completed: false,
        priority: 'high',
    },
        {
            id: 214,
            title: 'Write to Sarah',
            description: 'Eldest father can design tastes did joy settle. Roused future he ye an marked. Arose mr rapid '
                + 'in so vexed words. Gay welcome led add lasting chiefly say looking. ',
            completed: false,
            priority: 'low',
        },
        {
            id: 215,
            title: 'Make a mind-map',
            description: 'Eldest father can design tastes did joy settle. Roused future he ye an marked. Arose mr rapid '
                + 'in so vexed words. Gay welcome led add lasting chiefly say looking. ',
            completed: false,
            priority: 'medium',
        },
        {
            id: 216,
            title: 'Write a text',
            description: 'Eldest father can design tastes did joy settle. Roused future he ye an marked. Arose mr rapid '
                + 'in so vexed words. Gay welcome led add lasting chiefly say looking. ',
            completed: true,
            priority: 'low',
        },
        {
            id: 217,
            title: 'Make a blog post about marketing',
            description: 'Eldest father can design tastes did joy settle. Roused future he ye an marked. Arose mr rapid '
                + 'in so vexed words. Gay welcome led add lasting chiefly say looking. ',
            completed: true,
            priority: 'low',
        }],
    priorityFilter: '',
};

function getId(state) {
    return state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
}

// state 가 undefined 일때 (store가 생성될때) state 의 기본값을 initialState 로 사용
// action.type 에 따라 다른 작업을 하고, 새 상태를 만들어서 반환
// state 값을 직접 수정하면 안되고, 기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return Object.assign({}, state, {
                todos: [{
                    title: action.title,
                    description: action.description,
                    priority: action.priority,
                    completed: false,
                    id: getId(state),
                }, ...state.todos],
            }); // ... 은 자바스크립트의 전개연산자, 기존의 객체안에 있는 내용을 해당 위치에다가 풀어준다는 의미
        case 'COMPLETE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.map(todo => (todo.id === action.id
                    ? Object.assign({}, todo, {
                        updated: false,
                        completed: !todo.completed,
                    }) : todo)),
            });
        case 'DELETE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.filter(todo => todo.id !== action.id),
            });
        case 'PRIORITY_FILTER':
            return Object.assign({}, state, {
                priorityFilter: action.priorityFilter,
            });
        default:
            return state;
    }
};
export default todoReducer;
