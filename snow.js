const snowContainer = document.querySelector('.snow');
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random()*window.innerWidth+'px';
    snowflake.style.fontSize = Math.random()*20+10+'px';
    snowflake.style.animationDuration = Math.random()*5+5+'s';
    snowflake.style.opacity = Math.random();
    snowContainer.appendChild(snowflake);
    setTimeout(()=>snowflake.remove(),10000);
}
setInterval(createSnowflake,200);