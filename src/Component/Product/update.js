import React, { Component } from 'react';
import Api from '../api';
import { withRouter } from 'react-router-dom';
class ProductUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage['auth']),
            token: localStorage['token'],
            name: '',
            price: '',
            status: '',
            sale: '',
            company: '',
            detail: '',
        }
        this.renderSale = this.renderSale.bind(this)
        this.renderBrand = this.renderBrand.bind(this)
        this.renderCat = this.renderCat.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleUserInputFile = this.handleUserInputFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        
        Api.get('user/product/' + this.props.match.params.id, config) 
            .then(res => { 
                if (res.data.data) {                   
                    let data = res.data.data
                    this.setState({
                        name: data.name,
                        price: data.price,
                        category: data.id_category,
                        brand: data.id_brand,
                        status: data.status,
                        sale: data.sale,
                        company: data.company_profile,
                        detail: data.detail,
                        images: data.image
                    })
                }
            })
            .catch(err => console.log(err))
        Api.get('category-brand')
            .then(res => {
                this.setState({
                    categories: res.data.category,
                    brands: res.data.brand,
                    category: res.data.category[0]['id'],
                    brand: res.data.brand[0]['id']
                })
            })
        .catch(err => console.log(err))
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    maxSelectFile=(event)=>{
        let files = event.target.files // create file object
            if (files.length > 3) { 
               const msg = 'Only 3 images can be uploaded at a time'
               event.target.value = null // discard selected file
               alert(msg)
              return false;
     
          }
        return true;
     
     }

    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = ''
        // list allow mime type
        const types = ['image/png', 'image/jpeg', 'image/gif']
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                err += files[x].type + ' is not a supported format\n';
            }
        };
      
        if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            alert(err)
            return false;
        }
        return true;
    }
    
    handleUserInputFile(e) {
        let files = e.target.files
        if (this.maxSelectFile(e) && this.checkMimeType(e)) {
            // if return true allow to setState
            this.setState({
                file: files
            })
        }
    }

    handleSubmit(e) {
        
        e.preventDefault();
        let url = 'user/edit-product/' + this.props.match.params.id
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        
            const formData = new FormData();
            formData.append('name', this.state.name)
            formData.append('price', this.state.price)
            formData.append('id_user', this.state.user.id)
            formData.append('category', this.state.category)
        formData.append('brand', this.state.brand)
        formData.append('company', this.state.company)
        formData.append('detail', this.state.detail)
            formData.append('status', this.state.status)
            if (this.state.sale) {
                formData.append('sale', this.state.sale)    
            }
            if (this.state.file) {
                Object.values(this.state.file).map((object, i) => {
                    formData.append('file[]', object)
                 })
            }
                Api.post(url, formData, config)
                    .then(res => { 
                this.setState({
                    errors: res.data.errors,
                })
                this.setState({
                    message: this.renderMessage()
                })
             })
            .catch(error => {console.log(error)});
    }

    renderMessage() {
        if (this.state.errors) {
            let contentErr = Object.values(this.state.errors);
            return <div class="alert alert-danger" role="alert">
            {contentErr.map((fieldName, i) => { 
                return <p key={i}>{ contentErr[i][0] }</p>
             }) }
            </div>;
        } else {
            return <div class="alert alert-success" role="alert">
                Update Success !
            </div>;
        }   
    }

    renderCat() {
        let categories = this.state.categories;
        if (categories instanceof Array) {
            return (
                <select  value={ this.state.category } onChange={ this.handleChange } name="category">
                    {categories.map((cate, i) => {
                       return <option value={ cate.id }>{ cate.category }</option>
                    })}
                </select>
            )         
        }
    }
    
    renderBrand() {
        let brands = this.state.brands;
        if (brands instanceof Array) {
            return (
                <select value={ this.state.brand } onChange={ this.handleChange } name="brand">
                    {brands.map((brand, i) => {
                       return  <option value={ brand.id }>{ brand.brand }</option>
                    })}
                </select>
            )         
        }
    }  

    renderImage(images) {
        if (images instanceof Array) {
            return (
                <div style={{ display: "flex"}}>
                    {images.map((object, i) => {
                    return (
                        <div style={{maxWidth: "40px", margin: '0 10px'}}>
                            <img key={i} width="40px" height="40px" src={ 'http://laravel-api.local/upload/user/product/' + this.state.user.id + '/' + object} />
                            <input type="checkbox" value={ object } />
                        </div>
                    )
                    })}
                </div>
            )
        }
    }

    renderSale() {
        if (this.state.status == 2) {
            return <input name="sale" onChange={this.handleChange} type="number"  value={ this.state.sale }/>
        }
    }
    render() {  
        if (this.state.user) {
            return (
                <div className="col-sm-4">
                    { this.state.message ?? null }
                    <div className="signup-form">{/*sign up form*/}
                        <h2>Product Update !</h2>
                        <form onSubmit={ this.handleSubmit }>
                        <input name="name" type="text" onChange={ this.handleChange } value={ this.state.name }  placeholder="Name" />
                        <input name="price" type="number"  onChange={ this.handleChange } value={ this.state.price }  placeholder="Price"/>
                            {this.renderCat()}
                            {this.renderBrand()}
                        <select  onChange={ this.handleChange } value={ this.state.status }  name="status">
                            <option >Please Choose your status</option>    
                            <option value={1}>Sale</option>
                            <option value={2}>New</option>
                        </select>
                            {this.renderSale()}
                            <input name="company" type="text" onChange={ this.handleChange } value={ this.state.company }  placeholder="company" />
                            <input multiple onChange={this.handleUserInputFile} type="file" />
                            {this.renderImage(this.state.images)}
                            <textarea name="detail" onChange={this.handleChange} value={ this.state.detail }  placeholder="...">{ this.state.detail }</textarea>
                            <button type="submit" className="btn btn-default">Add</button>
                        </form>
                    </div>{/*/sign up form*/}
                </div>
            );
        }  
    }
}
export default withRouter(ProductUpdate)
