const job=require('../models/job');

const createJobPost = async (req, res) => {
    try {
        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            refUserId
            
        } = req.body;
        if(!companyName || 
           !logoUrl || 
           !title || 
           !description || 
           !salary || 
           !location || 
           !duration ||
           !locationType || 
           !skills 
           ){
            return res.status(400).json({
                errorMessage: 'bad request',
            });
           }
           const userId=req.userId;
           const jobDetails =new job({
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            refUserId:userId,
           })
           await jobDetails.save();
           res.json({
            message: 'job post created successfully',
           })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            errorMessage:"something went wrong"
        })
    }
}
const getJobDetailsById = async (req,res)=>{
try{
    const jobId=req.params.jobId;
    const jobDetails=await job.findById(jobId);
    if(!jobDetails){
        return res.status(400).json({
            errorMessage: 'bad request',
        });
    }
    res.json({data:jobDetails})

}
catch (error) {
    console.log(error);
    res.status(500).json({
        errorMessage:"something went wrong"
    })
}
}
module.exports ={createJobPost,getJobDetailsById};