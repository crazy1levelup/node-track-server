const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        require: true
    }
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login")
    }
    
    return user;
}



userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;
