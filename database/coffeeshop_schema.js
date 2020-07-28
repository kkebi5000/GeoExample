var Schema = {};

//속성으로 함수를 추가한다.
Schema.createSchema = function(mongoose){
    var CoffeeshopSchema = mongoose.Schema({
        name:{type:String, index:'hashed', default:''},
        address:{type:String, default:''},
        tel:{type:String, default:''},
        geometry:{
            type:{type:String, default:'Point'},
            coordinates:[{type:'Number'}]
        },
        created_at:{type:Date, index:{unique:false}, default:Date.now},
        updated_at:{type:Date, index:{unique:false}, default:Date.now}
    });

    CoffeeshopSchema.index({geometry:'2dsphere'});

    //CoffeeshopSchema가 mongoose.Schema이므로 CoffeeshopSchema 는 mongoose.Schema.static과 같다. 즉 원래있는 함수이다.
    CoffeeshopSchema.static('findAll', function(callback){
        
        //static함수 실행시 findAll을 하면 모든것을 찾아 돌려준다.
        return this.find({}, callback);
    });

    CoffeeshopSchema.static('findNear', function(longitude, latitude, maxDistance, callback){
        console.log('findNear 호출됨.');

        this.find().where('geometry').near({
            center:{type:'Point', coordinates:[parseFloat(longitude),parseFloat(latitude)]},
            maxDistance:maxDistance
        }).limit(1).exec(callback);
    });

    return CoffeeshopSchema;


};

module.exports = Schema;