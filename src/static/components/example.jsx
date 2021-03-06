/**
* @jsx React.DOM
*/
var converter = new Showdown.converter();
var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function (comment) {
        var comments, newComments;
        comments = this.state.data;
        newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) {
                this.setState({data: data});
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: []};
    },
    componentWillMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});
var CommentList = React.createClass({
    render: function () {
        var commentNodes;
        commentNodes = this.props.data.map(function (comment) {
            return <Comment author={comment.author}>{comment.text}</Comment>;
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});
var CommentForm = React.createClass({
    handleSubmit: function (e) {
        var author, text;
        e.preventDefault();
        author = this.refs.author.getDOMNode().value.trim();
        text = this.refs.text.getDOMNode().value.trim();
        if (!text || !author) {
            return false;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" ref="author" placeholder="Your name" />
                <input type="text" ref="text" placeholder="Say something ..." />
                <input type="submit" value="Post" />
            </form>
        );
    }
});
var Comment = React.createClass({
    render: function () {
        var rawMarkup;
        rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            <div className="comment">
            <h2 className="commentAuthor">{this.props.author}</h2>
            <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});
React.renderComponent(
    <CommentBox url="comments.json" pollInterval={2000} />,
    document.getElementById('content')
);