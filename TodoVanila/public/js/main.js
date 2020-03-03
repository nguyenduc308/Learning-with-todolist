let data = [
    {
        id: 123213,
        content: "Đi làm",
        level: 1,
        status: true,
        date: new Date().getDate(),
    }
]
function selectItem(item,value) {
    const items = document.querySelectorAll('.select-box__item')
    items.forEach(e => {
        e.classList.remove('selected');
        item.classList.add('selected');
    })
    return todo.setLevel(value)
}

localStorage.getItem('todoItems') || localStorage.setItem('todoItems', JSON.stringify(data))
const todo = {
    data,
    valueState: 0,
    init: [
        {status: "Low", style:"badge badge--success"},
        {status: "Mid", style:"badge badge--warning"},
        {status: "High", style:"badge badge--danger"},
    ],
    element: document.getElementById('t-body-render'),
    genarate: function() {
        this.data = JSON.parse(localStorage.getItem('todoItems'));
        this.render(this.data, this.element);
    },
    setLevel:function(value){
        return this.valueState = value;
    },
    addItem: function(content, level) {
        if(!content.value.trim()) return alert("Value is required")
        const id = Math.floor(Math.random()*1000)
        const item = {
            id: id,
            content: content.value,
            level: parseInt(this.valueState) || 0,
            status: false,
            date: new Date().getDate() + "/" + new Date().getMonth()
        }
        const newData = [item, ...this.data]
        content.value = "";
        this.saveItems(newData);
    },
    deleteItem: function(id) {
        const index = this.data.findIndex(e => e.id === id)
        if(index === -1) return alert("Error")
        const newData = [
            ...this.data.slice(0,index),
            ...this.data.slice(index+1)
        ]
        console.log(newData)
        this.saveItems(newData);
    },
    checkDoneItem: function(id) {
        const index = this.data.findIndex(e => e.id === id);
        if(index === -1) return alert("Error");
        let item = this.data[index];
            item.status = !item.status;
        const newItems = [
            ...this.data.slice(0,index), 
            item,
            ...this.data.slice(index+1)
        ]
        return this.saveItems(newItems)
    },
    saveItems: function(items) {
        localStorage.setItem('todoItems', JSON.stringify(items));
        this.genarate();
    },
    render: function(data,element) {
        let html = ""
            html += data.map((item, index) => {
           return(`<tr>
                <td>${index + 1}</td>
                <td>${item.content}</td>
                <td><span class="${this.init[item.level].style}">${this.init[item.level].status}</span></td>
                <td 
                onclick="todo.checkDoneItem(${item.id})
                ">
                    <i class="${item.status?"green":"gray"} fas fa-check-circle"></i>
                </td>
                <td>${item.date}</td>
                <td><button onclick="todo.deleteItem(${item.id})">Delete</button></td>
            </tr>`)
        }).join('')
        return element.innerHTML = html;
    }
}
todo.genarate();
document.getElementById('todo-content').addEventListener('keyup', function(e){
    if(e.keyCode===13) return todo.addItem(this, document.getElementById('todo-level')) 
})