$(function(){
    //得到所有的错误信息，循环遍历之，调用一个方法来确定是否显示错误信息
    $(".errorClass").each(function(){
        showError($(this)); //遍历每个元素，使用每个元素来调用showError方法
    })

    //输入框得到焦点，隐藏错误信息
    $(".inputClass").focus(function (){
        var labelId = $(this).attr("id") + "Error" //通过输入框找到对应的label的id
        $("#" + labelId).text("")
        showError($("#" + labelId))

        var img = $(this).attr("id") + "Img";
        if(img == "usernameImg")
        {
            $("." + img).css("background-position", "0px -48px")
        }
        else if(img == "loginpasswordImg")
        {
            $("." + img).css("background-position", "-48px -48px")
        }
    })

    //输入框失去焦点，进行校验
    $(".inputClass").blur(function (){
        var id = $(this).attr("id")
        //得到校验的函数名
        var funName = "validate" + id.substring(0,1).toUpperCase() + id.substring(1) + "()"
        //evalz将字符串当作java代码处理
        if(eval(funName))
        {
            var img = $(this).attr("id") + "Img";
            if(img == "usernameImg")
            {
                $("." + img).css("background-position", "0px 0px")
            }
            else if(img == "loginpasswordImg")
            {
                $("." + img).css("background-position", "-48px 0px")
            }
        }
    })

    //生成验证码
    createVerifyCode()
})

/**
 判断当前元素是否存在内容，如果存在显示，如果不存在不显示！
 */
function showError(ele){
    var text = ele.text()

    if(!text)
    {
        ele.css("display", "none"); //隐藏元素
    }
    else
    {
        ele.css("display", ""); //显示元素

        var id = ele.attr("id").replace("Error", "")
        var img = id + "Img";
        if(img == "usernameImg")
        {
            $("." + img).css("background-position", "0px -96px")
        }
        else if(img == "loginpasswordImg")
        {
            $("." + img).css("background-position", "-48px -96px")
        }
    }
}

/**
    生成验证码
 */
function createVerifyCode(){
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";  //用数组chars保存验证码里出现的字符
    var randCode="";   //定义一个初始值为空的字符串变量为最终产生的随机验证码
    for(var i=0;i<4;i++){
        //0-1的随机小数 -->  0~数组长度-1的范围   取整
        var randPosition = Math.floor(Math.random()*(chars.length-1));  //每次生成一个随机数的位置
        randCode += chars[randPosition];//带有随机位置作为下标，指示到当前随机产生的某个字符上，将其连接到随机验证码的后面
    }
    //循环四次后即可显示出验证码
    document.getElementById("imgVerifyCode").innerText = randCode;//当产生验证码后，将其显示到 div 中
}

/**
    换一张验证码
    */
function changeVerifyCode()
{
    createVerifyCode()

    validateVerifycode()
}

/**
 * 登录名校验
 * @returns {boolean}
 */
function validateUsername(){
    //非空校验
    var id = "username"
    var value = $("#" + id).val() //获取输入框内容

    var errorId = $("#" + id + "Error")
    //用户名是否为空
    if(!value || value.trim().length == 0)
    {
        errorId.text("用户名不能为空")
        showError(errorId)
        return false
    }
    //用户名长度为3-20
    if(value.length<3 || value.length>20)
    {
        errorId.text("用户名长度为3-20")
        showError(errorId)
        return false
    }

    return true
}

/**
 * 登录密码校验
 * @returns {boolean}
 */
function validateLoginpassword(){
    var id = "loginpassword"
    var value = $("#" + id).val() //获取输入框内容

    var errorId = $("#" + id + "Error")
    //密码是否为空
    if(!value|| value.trim().length == 0)
    {
        errorId.text("密码不能为空")
        showError(errorId)
        return false
    }
    //密码长度为6-30
    if(value.length<6 || value.length>30)
    {
        errorId.text("密码长度为6-30")
        showError(errorId)
        return false
    }

    return true
}

/**
    验证码校验
 */
function validateVerifycode(){
    var id = "verifycode"
    var value = $("#" + id).val() //获取输入框内容

    var errorId = $("#" + id + "Error")
    //验证码是否为空
    if(!value)
    {
        errorId.text("验证码不能为空")
        showError(errorId)
        return false
    }
    //验证码长度为4
    if(value.length != 4)
    {
        errorId.text("验证码长度为4！")
        showError(errorId)
        return false
    }
    //验证码验证
    var verifyCode = $("#imgVerifyCode").text()
    if(verifyCode.toUpperCase() != value.toUpperCase())
    {
        errorId.text("验证码错误")
        showError(errorId)
        return false
    }
    return true
}

/**
    * 登录
*/
function login()
{
    var id1 = "username"
    var id2 = "loginpassword"
    var id3 = "verifycode"

    var flag1 = validateUsername()
    var flag2 = validateLoginpassword()
    var flag3 = validateVerifycode()

    if(flag1 && flag2 && flag3)
    {
        var username = $("#" + id1).val()
        var password = $("#" + id2).val()

        if(username == localStorage.getItem("username") &&
        password == localStorage.getItem("password"))
        {
            sessionStorage.setItem("username", username)
            sessionStorage.setItem("password", password)
            window.location.replace("index.html")
        }
        else
        {
            var errorId = $("#usernameError")
            errorId.text("用户名或密码错误")
            showError(errorId)
        }
    }
}