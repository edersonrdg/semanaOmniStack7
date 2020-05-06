import React, { Component } from 'react';
import api from '../services/api'
import io from 'socket.io-client'


import './feed.css'


import More from '../assets/more.svg'
import Like from '../assets/like.svg'
import Comment from '../assets/coment.svg'
import Send from '../assets/envi.svg'

class Feed extends Component {
    state = {
        feed: [], 
    }

    async componentDidMount() {
        this.registerTosocket()


        const response = await api.get('posts')

        this.setState( { feed: response.data } )
    }
    registerTosocket = ( ) =>{
        const socket  = io('http://localhost:3333')

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ... this.state.feed]})
        })

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => post._id === likedPost._id ? likedPost : post)
            })
        })
    }


    handleLike = id => {
        api.post(`/posts/${id}/like`)
    }

    render() {
        return (
            <section id="post-list">
                { this.state.feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span> {post.author} </span>
                            <span className="place"> {post.place} </span>
                        </div>

                        <img src={More} alt="Mais"/>
                    </header>

                    <img src={`http://localhost:3333/files/${post.image}`} alt=""/>

                    <footer>
                        <div className="actions">

                            <button type="button" onClick={() => this.handleLike(post._id)}>
                            <img src={Like} alt=""/>
                            </button>
                            
                            <img src={Comment} alt=""/>
                            <img src={Send} alt=""/>
                        </div>

                        <strong> {post.likes} curtidas </strong>

                        <p> 
                            {post.description}
                            <span> #{post.hashtags} </span>    
                        </p>
                    </footer>
                </article>))}
            </section>
        )
    }
}

export default Feed