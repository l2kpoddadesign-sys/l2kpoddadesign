<?php include 'config.php'; ?>

<form method="POST">
<input type="text" name="user" placeholder="Username">
<input type="password" name="pass" placeholder="Password">
<button name="login">Login</button>
</form>

<?php
if(isset($_POST['login'])){
    if($_POST['user']==$username && $_POST['pass']==$password){
        $_SESSION['admin']=true;
        header("Location: admin.php");
    } else {
        echo "Wrong login!";
    }
}
?>