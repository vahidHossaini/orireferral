module.exports = class referralBootstrap{
  constructor(config)
  {
    this.funcs=[
      {
          name:'getMyCode', 
      },
      {
          name:'invite', 
          inputs:[
			{
				name:'code',
				type:'string',
				nullable:false
			}
          ]
      }, 
	  
	  
	   
    ]
    this.auth=[ 
        ]
  }
}