var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;



var quickReplyButtonSchema = new Schema({
    type: {type: String, enum: ['text', 'location'], default: 'text', required: true},
    title: String,
    payload: String,
    image: String
});


var quickReplySchema = new Schema({
    name: String,
    description: String,
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type: Date, default: Date.now, require: true},
    updated_at: {type: Date, default: Date.now, require: true},
    contentType: {type: String, enum: ['static', 'dynamic'], default: 'static', required: true},
    text: {type: String, required: false},
    items: [quickReplyButtonSchema]
});


var buttonSchema = new Schema({
    type: {type: String, enum: ['web_url', 'postback', 'element_shear', 'payment', 'phone_number',
        'account_link', 'account_unlink', 'game_play'],
    default: 'web_url', required: true},
    title: String,
        payload: {},
    other_data: {}
});

var buttonListSchema = new Schema({
    name: String,
    description: String,
    type: {type: String, enum: ['card', 'normal'], default: 'normal', required: true},
    text: String,
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type: Date, default: Date.now, require: true},
    updated_at: {type: Date, default: Date.now, require: true},
    items: [buttonSchema]
});


var attachmentSchema = new Schema({
    name: String,
    description: String,
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type: Date, default: Date.now, require: true},
    updated_at: {type: Date, default: Date.now, require: true},
    type: {type: String, enum: ['image', 'audio', 'video', 'file'], default: 'image', required: true},
    title: String,
    payload: {
        url: {type:String,require:true}
    }
});



var cardSchema = new Schema({
    buttons: [buttonSchema],
    card: String,
    card_type: String,
    company: {type: Number, required: true},
    contentType: {type: String, enum: ['static', 'dynamic'], default: 'static', required: true},
    created_at: {type: Date, default: Date.now, require: true},
    description: String,
    form: String,
    items: [
        {
            title: String,
            sub_title: String,
            image_url: String,
            default_action: {
                url: String,
            },
            buttons: [buttonSchema]
        }
    ],
    name: String,
    tenant: {type: Number, required: true},
    type: {type: String, enum: ['generic', 'list'], default: 'generic', required: true},
    updated_at: {type: Date, default: Date.now, require: true}  
});

var mediaCardSchema = new Schema({
    name: String,
    description: String,
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type: Date, default: Date.now, require: true},
    updated_at: {type: Date, default: Date.now, require: true},
    items: [
        {
            type: {type: String, enum: ['image', 'audio'], default: 'image', required: true},
            media_url: String,
            attachment_id: String,
            buttons: [buttonSchema]
        }
    ],

});

var addressSchema = new Schema({
    street: {type: String, required:true},
    city: {type: String, required:true},
    postalCode: {type: String, required:true},
    state: {type:String},
    province: {type:String},
    country: {type:String, required:true}
});

var receiptAdjustmentSchema =  new Schema({
    description: {type:String, required:true},
    amount: {type: Number, required:true }

})

var receiptElement = new Schema({
    title: {type:String, required:true},
    subtitle: {type:String},
    quantity: {type:Number, default:1},
    price: {type:Number, required:true},
    currency: {type:String, required:true},
    image_url: {type:String}
});

var receiptCardSchema = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type: Date, default: Date.now, require: true},
    updated_at: {type: Date, default: Date.now, require: true},
    type: {type: String, default:'receipt', required: true},
    recipient_name: {type: String, required:true},
    order_number: {type: String, required: true},
    currency: {type: String, required: true},
    payment_method: {type: String, required: true},
    order_url: {type:String},
    timestamp: {type:String},
    shipping_address: addressSchema,
    adjustments: [receiptAdjustmentSchema],
    summary: {
        sub_total: {type:Number},
        shipping_cost: {type:Number},
        total_tax: {type:Number},
        total_cost: {type:Number}
    },
    elements: [receiptElement]
});

var persistMenuSchema = new Schema({
    locale: {type: String, required: true},
    composer_input_disabled: {type: Boolean, required: true},
    created_at: {type: Date, default: Date.now, require: true},
    updated_at: {type: Date, default: Date.now, require: true},
    call_to_actions: {},
});



module.exports.Receipt = mongoose.model('Receipt', receiptCardSchema);
module.exports.QuickReply = mongoose.model('QuickReply', quickReplySchema);
module.exports.ButtonList = mongoose.model('ButtonList', buttonListSchema);
module.exports.Attachment = mongoose.model('Attachment', attachmentSchema);
module.exports.Card = mongoose.model('Card', cardSchema);
module.exports.MediaCard = mongoose.model('MediaCard', mediaCardSchema);
module.exports.PersistMenu = mongoose.model('PersistMenu', persistMenuSchema);


