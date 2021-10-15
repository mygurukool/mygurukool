import React,{PureComponent} from 'react';
import axios from 'axios'
import Teachers from './teachers.component';
import * as _apiUtils from "../util/AxiosUtil";

class TeachersContainer extends  PureComponent {

    state={
        country:{},
        error:{}
    }

    async create(event){
        event.preventDefault();
        var data = {
                    address:event.target.address.value,
                    last_name:event.target.last_name.value,
                    password:event.target.password.value,
                    first_name:event.target.first_name.value,
                    email:event.target.email.value,
                    country:event.target.country.value,
                    experience:event.target.experience.value
                    }

        _apiUtils.saveTeacher(data).then(async (res)=>{
            alert(res.success.success)
            await this.setState({error:res.error})
         }).catch(async (err)=>{
          console.log( await err);
        //   console.log(err.response.status);
         })
    }

    async getCountries(){
        var result = await axios.get('https://api.first.org/data/v1/countries').then((res)=>{
                                return res.data
                            }).catch((error)=>{
                                console.log(error)
                            })
                            console.log(result)

        // if(result.length > 0){
        //     await this.setState({country:result})
        // }    
    }

    componentDidMount(){
        this.getCountries()
    }

    render(){
   
        return(
            <Teachers
                create={this.create.bind(this)}
                {...this.state}
            />
        )
    }

}

export default TeachersContainer;
