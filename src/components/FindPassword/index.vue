<template>
    <div class="password_body">
       <div class="email">
           邮箱：<input type="text" class="password_text" v-model="email">
           <button id="emailBtn" @touchstart='handleToVerify'>发送验证码</button>
       </div>
       <div>
           新密码：<input type="text" class="password_text" v-model="password">
       </div>
       <div>
           验证码：<input type="text" class="password_text" v-model="verify">
       </div>
       <div class="password_btn">
           <button @touchstart='handleToPassword'>确定修改</button>
       </div>
       <div class="password_link">
            <router-link to="/mine/login">立即登录</router-link>
            <router-link to="/mine/findPassword">立即注册</router-link>
		</div>
    </div>
</template>

<script>
import {messageBox } from '@/components/JS'
export default {
    name: 'findPassword',
    data(){
        return {
            email: '',
            password:'',
            verify: ''
        }
    },
    methods:{
        handleToVerify(){
            this.axios.get('/api2/users/verify?email='+ this.email ).then((res)=>{
                var status = res.data.status;
                if(status ==0){
                    messageBox({
                        title: '验证码',
                        content: '验证码已发送',
                        ok:'确定'
                    })
                }
                else{
                    messageBox({
                        title: '验证码',
                        content: '验证码发送失败',
                        ok:'确定'
                    })
                
                }
            })
        },
        handleToPassword(){
            this.axios.post('/api2/users/findPassword',{
                email: this.email,
                password: this.password,
                verify: this.verify
            }).then((res)=>{
                var status = res.data.status;
                var _this = this;
                if(status ==0){
                    messageBox({
                        title: '修改',
                        content: '修改密码成功',
                        ok:'确定',
                        handleOk(){
                            _this.$router.push('/mine/login')
                        }
                    })
                }
                else{
                    messageBox({
                        title: '修改',
                        content: '修改密码失败',
                        ok:'确定'
                    })
                
                }
            })
        }
    }
}
</script>

<style scoped>
#content .password_body{  width:100%;}
.password_body .password_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.password_body .password_btn{ height:50px; margin:10px;}
.password_body .password_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.password_body .password_link{ display: flex; justify-content:space-between;}
.password_body .password_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
.email{position: relative;}
.email #emailBtn{position: absolute;top: 10px;right: 10px;height: 30px;border-radius: 3px; border:none;padding: 5px}

</style>