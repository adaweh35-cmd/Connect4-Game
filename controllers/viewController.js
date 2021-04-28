exports.getLoginForm = async(req,res) => {
    res.status(200).render('login', {
      title: 'Log into your account'
    });
}

exports.getMainPage = async(req,res) => {
    res.status(200).render('mainpage', {
        
    })
}