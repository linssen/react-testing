var converter = new Showdown.converter();
var CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});
var CommentList = React.createClas({
    render: function () {
        return (
            <div className="commentList">
                <Comment author="Cool Guy">This is the first comment.</Comment>
                <Comment author="Someone Else">This is another comment.</Comment>
            </div>
        );
    }
});
var CommentForm = React.createClass({
  render: function () {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});
var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                {converter.makeHtml(this.props.children.toString())}
            </div>
        );
    }
});

React.renderComponent(
    <CommentBox />,
    document.getElementById('content')
);