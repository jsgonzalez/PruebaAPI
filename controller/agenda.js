const formidable = require('formidable');
const Agenda = require('../model/agenda.model')
const _ = require('loadsh');

exports.agendaById = (req, res, next, id) => {
    Agenda.findById(id)
    .populate("creadoPor", "_id")    
    .exec((err, agenda)=>{
        if(err || !agenda){
            return res.status(400).json({
                error : err
            })
        }

        req.agenda = agenda;
        next();
    })
}

exports.agendaByUser = (req, res) => {

    Agenda.find( { creadoPor : req.profile._id})
    .sort("created")
    .exec((err, agendas) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }

        res.json(agendas)
    }, error =>{
        console.log(error);
        res.status(400).json({
            error : error
        })
    })
}

exports.createAgenda = (req, res) => {

    let  newAgenda = new Agenda();
    const { titulo, iniciaDia, iniciaHora, finalizaDia, finalizaHora } = req.body;

    newAgenda.titulo = titulo;
    newAgenda.iniciaDia = iniciaDia;
    newAgenda.iniciaHora = iniciaHora;
    newAgenda.finalizaDia = finalizaDia;
    newAgenda.finalizaHora = finalizaHora;
    newAgenda.creadoPor = req.profile.id;

    Agenda.create(newAgenda).then( result => {
    
         if(!result){
             return res.status(500).json({
                 error : 'Error al crear la agenda en el calendario'
             })
         }

         res.status(200).json({
             message : "Agregado correctamente"
         })

    }, error => {
        res.status(500).json({ error })
    })

}

exports.byId = (req, res) => {
    return res.send(req.agenda);
}

exports.updateAgenda = (req, res) => {

    const { titulo, iniciaDia, iniciaHora, finalizaDia, finalizaHora } = req.body;

    Agenda.findByIdAndUpdate(req.agenda.id, { 
        titulo, iniciaDia, iniciaHora, finalizaDia, finalizaHora 
    }, result =>{

          res.status(200).json({
            message : "Registro actualizado correctamente"
        })
    }, error => res.status(500).json({error})) ;
}

exports.deleteAgenda = (req, res) => {
    Agenda.findByIdAndRemove(req.agenda._id, result=>{

          res.status(200).json({
            message : "Registro borrado correctamente"
        })
    }, error => res.status(500).json({error})) ;
}