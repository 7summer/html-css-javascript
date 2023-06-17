var carts = [] //投票信息
var sum = 0 //总票数
/**
 * 主函数
 */
function main(){
    var carts = getCarts() //获取投票信息

    showCarts() //展示投票信息
    setTimeout(drawVote, 1000) //票数占比条延迟

    //用户信息
    var userInfo = document.getElementsByClassName("userInfo")[0]
    //用户选票数
    var voteNum = document.getElementsByClassName("voteNum")[0]
    if(sessionStorage.getItem("username"))
    {
        userInfo.innerText = "欢迎你," + sessionStorage.getItem("username")
        voteNum.innerText = localStorage.getItem("vote")
    }
    else
    {
        userInfo.innerHTML = "请登录"
        voteNum.innerText = 0
    }
}

/**
 * 获取投票信息
 */
function getCarts()
{
    //如果浏览器有投票信息，则直接读取浏览器的投票信息
    if(localStorage.getItem("carts"))
    {
        carts = JSON.parse(localStorage.getItem("carts"))
    }
    else
    {
        carts = voteList
    }
}

/**
 * 展示投票信息
 */
function showCarts(){
    var tmp = document.querySelector("#tmp") //获取模板
    var container = document.getElementsByClassName('container')[0]

    var str = ""
    for(var i=0; i<carts.length; i++)
    {
        str = tmp.innerHTML
        str = str.replace("#image", carts[i].image)
        str = str.replace("#name", carts[i].name)
        str = str.replace("#college", carts[i].college)
        str = str.replace("index", i)
        str = str.replace("#num", carts[i].vote)

        sum += carts[i].vote

        container.insertAdjacentHTML("beforeend", str)
    }
}

/**
 * 绘制长度图形
 */
function drawVote()
{
    var votes = document.getElementsByClassName("vote")

    for(var i=0; i<carts.length; i++)
    {
        votes[i].style.width = (carts[i].vote/sum) * 100 + "px"
    }
}

/**
投票
 */
function vote(index)
{
    if(sessionStorage.getItem("username"))
    {
        var vote = localStorage.getItem("vote") //获取用户剩余的票数
    
        if(vote <= 0)
        {
            showInfo("你的票已投完")
        }
        else
        {
            carts[index].vote++ //选手票数+1
            sum++ //总票数+1
    
            var voteNum = document.getElementsByClassName("voteNum")[0]
            voteNum.innerText = vote-1 //用户票数-1

            var num = document.getElementsByClassName("num")[index]
            num.innerText = carts[index].vote //更新选手票数

            localStorage.setItem("carts", JSON.stringify(carts))
            localStorage.setItem("vote", vote-1)
        
            drawVote() //展示新的投票情况
            showInfo("已投票")
        }
    }
    else
    {
        showInfo("你还没登录")
    }
}

/**
退出
 */
function quit()
{
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("password")

    location = "index.html"
}

//提醒信息
var tid = null
function showInfo(message){
    var info = document.getElementsByClassName("info")[0]

    info.innerText = message
    info.style.opacity = 1

    //清除上一个延时
    if(tid) clearTimeout(tid)

    tid = setTimeout(function(){
        info.style.opacity = 0
    },500)
}


//执行主函数
main()
