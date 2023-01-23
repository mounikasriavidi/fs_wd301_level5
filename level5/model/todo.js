// models/todo.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */


    
    
    
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      await this.overdue();
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      await this.dueToday();
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      await this.dueLater();
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const yesterday = new Date(Date.now() - 864e5);
      const date = JSON.stringify(yesterday).substring(1, 11)
      try {
        const todos = await Todo.findAll({
          where:{dueDate:date,}
        });
        const todoList = todos.map((todo) => todo.displayableString()).join("\n");
        console.log(todoList);
      } catch (error) {
        //console.error(error);
      }
      

    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const today = new Date(Date.now());
      const date = JSON.stringify(today).substring(1, 11)
      try {
        const todos = await Todo.findAll({
          where:{dueDate:date,}
        });
        const todoList = todos.map((todo) => todo.displayableString()).join("\n");
        console.log(todoList);
      } catch (error) {
        //console.error(error);
      }

      
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const tomorrow = new Date(Date.now() + 864e5);
      const date = JSON.stringify(tomorrow).substring(1, 11)
      try {
        const todos = await Todo.findAll({
          where:{dueDate:date,}
        });
        const todoList = todos.map((todo) => todo.displayableString()).join("\n");
        console.log(todoList);

      } catch (error) {
        //console.error(error);
      }

    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const todo = await this.update(
        {
          completed : true
        },
          {
            where:{
              id:id,
            },
          }
        
      );
      console.log(todo.displayableString());

    }

    static associate(models) {
      // define association here

    }
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};