const IncomeSchema = require('../models/income');

exports.addIncome = async (req,res) =>{
      const { title, amount, category, description, date, type } = req.body;
      const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        type,
      });

      try{

        // Validations
        if( !title || !amount || !category || !description || !date ){
                return res.status(400).send({message: 'All fiels are required'})
        }
        if( amount <= 0 || amount  === 'number'){
                return res.status(400).send({message: 'Amount must be a valid number'});
        }
        await income.save();
        res.status(200).json({message: 'Income added'});

      }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error" });

      }
}

exports.getIncome = async (req, res) => { 
        try{
                const incomes = await IncomeSchema.find().sort({ceratedAT: -1})
                res.status(200).json(incomes)
        } catch (err){
                res.status(500).json({messagge: 'Server Error'});
        }

}

exports.deleteIncome = async(req, res) => {
        const {id} = req.params;
        console.log(req.params)
        
        IncomeSchema.findByIdAndDelete(id).then((income) => {
                res.status(200).json({message: 'Income deleted'});
                console.log("Income deleted" + id);
        }).catch((err) =>res.status(500).json({message: err.message}));
}

exports.incomeByMonth = async (req, res) => {
  try {
    const incomes = await IncomeSchema.aggregate([
      {
        $project: {
          month: { $month: "$date" },
          amount: 1,
        },
      },
      {
        $group: {
          _id: { month: "$month" },
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ messagge: "Server Error" });
  }
};