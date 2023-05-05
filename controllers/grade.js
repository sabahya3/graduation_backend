const Grade = require('../models/grade')

const addGrade= async(req,res)=>{
try{
    const {name,subjects } = req.body

if(!name) res.status(400).json({msg:"plaes enter grade name."})
const newGrade = await new Grade({name,classes:[],subjects}).save()

if(newGrade) res.status(201).json(newGrade)
}catch(e){
    res.status(401).json({msg:'An error has occured'})
}

}


const getGrades= async(req,res)=>{
    try{

    
   
    const grades = await  Grade.find({},{name:1,studentsCount:1})
    
    if(grades) res.status(200).json(grades)
    }catch(e){
        res.status(401).json({msg:'An error has occured'})
    }
    
    }

    const getGradeSubjects= async(req,res)=>{
        try{
    
        
            const id = req.params.id
        const gradeSubjects = await  Grade.findOne({_id:id},{subjects:1}).populate('subjects' ,  { name: 1, _id: 1})
        
        if(gradeSubjects) res.status(200).json(gradeSubjects)
        }catch(e){
            res.status(401).json({msg:'An error has occured'})
        }
        
        }

        const getGradeClasses= async(req,res)=>{
            try{
        
            
                const id = req.params.id
            const gradeClasses = await  Grade.findOne({_id:id},{classes:1}).populate('classes' ,  { name: 1, _id: 1})
            
            if(gradeClasses) res.status(200).json(gradeClasses)
            }catch(e){
                res.status(401).json({msg:'An error has occured'})
            }
            
            }

    const updateGrade= async(req,res)=>{
        const {name,subjects , classes , studentsCount } = req.body
        try {
            const id = req.params.id
    
            if (!id) return res.status(405).json({ msg: 'Please Enter The Grade Id' })
            const updatedGrade = await Grade.findByIdAndUpdate(id, {
                $set: {
                    name,subjects , classes , studentsCount 
                }
            }, { new: true })
    
            if (updatedGrade) return res.status(201).json(updatedGrade)
            if (!updatedGrade) return res.status(404).json({ msg: "An Error Occured" })
        } catch (e) {
            res.status(401).json({ msg: e.message })
        }
    
        
        }
        


  
        const deleteGrade = async (req, res) => {
        
            try {
                const id = req.params.id
                const deleted = await Grade.deleteOne({ _id: id })
        
                if (deleted) return res.status(202 ).json({msg:'deleted'})
        
            } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
        }

          
        const deleteClassFromGrade = async (req, res) => {
        
            try {
                const {classId , gradeId} = req.body
          

               const deleted = await Grade.findOneAndUpdate({_id:gradeId},{$pull:{classes:classId}})
        
                if (deleted) return res.status(202 ).json({msg:'deleted'})
        
            } catch (e) { res.status(404).json({ msg: e.message }) }
        }


const getGradeById= async (req, res) => {
    try {

        const grade = await Grade.findOne({_id:req.params.id},{name:1,studentsCount:1})

        if (grade) return res.status(200).json(grade)
        if (!grade) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}


        module.exports = {
            addGrade,
            getGrades,
            updateGrade,
            deleteGrade,
            getGradeById,
            getGradeSubjects,
            getGradeClasses,
            deleteClassFromGrade
        }