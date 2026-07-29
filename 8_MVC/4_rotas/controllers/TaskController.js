const Task = require('../models/Task')

module.exports = class TaskController {
    static createTask(req, res) {
        res.render('tasks/create')
    }

    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: 'false',
        }

        await Task.create(task)

        res.redirect('/tasks')
    }

    static async showTasks(req, res) {
        // raw: true traz objetos simples, senão o handlebars recebe instancias do sequelize
        const tasks = await Task.findAll({ raw: true })

        // done é STRING no model, então a string 'false' seria truthy no {{#if}}
        const tasksList = tasks.map((task) => ({
            ...task,
            done: task.done === 'true',
        }))

        res.render('tasks/all', { tasks: tasksList })
    }
}
