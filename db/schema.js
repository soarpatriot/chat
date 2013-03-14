module.exports = function (mongoose, app) {

    var schemaOptions = {
        toJSON: {
            virtuals: true
        }
    };
    var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

    var PostSchema = new Schema({
        author    : ObjectId
        , title     : String
        , content    : String
        , published : { type: Boolean, default: false }
        , publishDate: { type: Date, default: Date.now }
    },schemaOptions);

    var Blog = mongoose.model('PostSchema', PostSchema);
};

