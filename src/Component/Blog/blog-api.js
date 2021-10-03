import react from 'react';
import axios from 'axios';

class BlogApi extends react.Component {

    constructor(props) {
        super(props)
        this.state = {
            blog: {}
        }
    }

    componentDidMount() {
        axios.get('http://laravel-api.local/api/blog/detail/4')
            .then(res => {
                this.setState({
                    blog: res.data
                });
            })
            .catch(error => {
                console.log(error)
            });
    }  
    
    render() {
        const blog = this.state.blog;
        console.log(blog);
        if (blog) {
            return (
                <div>
                    Id : { blog.id} <br/>
                    title: { blog.title} <br />
                    description: { blog.description }<br/>
                </div>
            )
        }
        return (
            <div>
                Sai url api
            </div>
        )
    }
}
export default BlogApi