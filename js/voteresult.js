var carts = [] //投票信息
var sum = 0 //总票数

function main()
{
    var carts = getCarts() //获取投票信息

    showCarts() //展示投票信息
    setTimeout(drawVote, 1000) //设置时间延迟
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
    var tmp = document.getElementById("tmp")
    var table = document.getElementById("voteInfo")

    var str = ""

    sum = 0

    for(var i=0; i<carts.length; i++)
    {
        str = tmp.innerHTML
        str = str.replace("#image", carts[i].image)
        str = str.replace("#name", carts[i].name)
        str = str.replace("#id", carts[i].id)
        str = str.replace("#voteNum", carts[i].vote)

        sum += carts[i].vote

        table.insertAdjacentHTML("beforeend", str)
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
        votes[i].style.width = (carts[i].vote/sum) * 240 + "px"
    }
}

/**
移除表格中的投票信息
 */
function removeVoteInfo()
{
    var voteInfo = document.getElementById("voteInfo")
    for(var i=0; i<carts.length; i++)
    {
        var rows = voteInfo.rows
        var lastRow = rows[rows.length-1]
        voteInfo.deleteRow(lastRow.rowIndex)
    }
}

/**
 * 按id排序
 */
function sortById()
{
    removeVoteInfo() //移除表格中的投票信息

    carts.sort(function (a, b){
        return a.id - b.id
    })

    showCarts() //添加投票信息
    setTimeout(drawVote, 1000) //绘制长度图形
}

/**
按票数升序排序
 */
function sortByVoteAscending()
{
    removeVoteInfo() //移除表格中的投票信息

    carts.sort(function (a,b){
        return a.vote - b.vote
    })

    showCarts() //添加投票信息
    setTimeout(drawVote, 1000) //绘制长度图形
}

/**
按票数降序排序
 */
function sortByVoteDscending()
{
    removeVoteInfo() //移除表格中的投票信息

    carts.sort(function (a,b){
        return b.vote - a.vote
    })

    showCarts() //添加投票信息
    setTimeout(drawVote, 1000) //绘制长度图形
}

//执行主函数
main()