var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TasksScheme = new Schema({
    task_name: {type: String, required: true},
    company: {type: String, required: true},
    tenant: {type: String, required: true},
    type: {type: String, required: true},
    form_name : {type: String, required: true},
    form_id : {type: String, required: true},
    assigner : {type: String, required: true},
    assignee : {type: String, required: true, default : 'NONE'},
    review_status: {type: String, required: true, enum: ['INQUEUE', 'PASSED', 'FAILED', 'INPROGRESS'], default : 'INQUEUE' },
    is_favorite: {type: Boolean, required: true, default : false},
    created_at: {type:Date, default: Date.now,require:true},
    updated_at: {type:Date, default: Date.now,require:true},
    raw_data: {},
    description: {type: String, required: true}

});

TasksScheme.index({"task_name" : 1, "company": 1, "tenant": 1}, {"unique": true});


module.exports.tasks = mongoose.model('tasks', TasksScheme);
