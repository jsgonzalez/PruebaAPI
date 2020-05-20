const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const agendaSchema = new mongoose.Schema({

    titulo : {
        type : String,
        required : true
    },
    iniciaDia : {
        type : String,
        required : true
    } ,
    iniciaHora : {
        type : String,
        required : true
    },
    finalizaDia : {
        type : String,
        required : true
    } ,
    finalizaHora : {
        type : String,
        required : true
    },
    creadoPor:{
        type : ObjectId ,
        ref : "User"
    },
    created : {
        type : Date,
        default : Date.now
    }

});

module.exports = mongoose.model("Agenda", agendaSchema);