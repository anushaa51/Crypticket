import SecretCopier from "./secret-copier.js";
import Copier from "./copier.js";

const e = React.createElement;

class Ticket extends React.Component {
    constructor(props) {
        super(props);
    }

    //for delete animation
    animateAndDelete() {

        $(ReactDOM.findDOMNode(this)).addClass("hiding");

        setTimeout(function () {
            this.props.deleteTicket(this.props.ticket);
        }.bind(this), 220);
    }

    render() {
        return e('div',
            { className: "ticket" },

            e("div",
                { className: "ticket-del-btn gen tick", onClick: () => this.animateAndDelete() },
                e("i",
                    { className: "far fa-trash-alt" },
                    null)
            ),

            e("h1",
                null,
                this.props.ticket.name),

            e(SecretCopier,
                {
                    curr: this.props.ticket.secret.slice(0, this.props.ticket.secret.indexOf('|')),
                    sign: this.props.ticket.secret.slice(this.props.ticket.secret.lastIndexOf('|') + 1, this.props.ticket.secret.indexOf(';')),
                    ticketAppend: this.props.ticket.secret.slice(this.props.ticket.secret.indexOf(';'))
                },
                null),

            e("div",
                null,

                e("span",
                    null,
                    this.props.ticket.date),

                e("span",
                    null,
                    this.props.ticket.time)
            ),

            //Optional ticket parameters

            //Links
            (this.props.ticket.link != undefined &&
                e("div",
                    { className: "opt-link", onClick: () => window.open("http://" + this.props.ticket.link) },
                    this.props.ticket.link)
            ),

            //Location + Navigation
            (this.props.ticket.x != undefined &&
                e(React.Fragment, null,

                    e("h6",
                        null,
                        "LOCATION"),

                    e("span",
                        null,
                        e(Copier,
                            { title: "X", content: this.props.ticket.x },
                            null)
                    ),

                    e("span",
                        null,
                        e(Copier,
                            { title: "Y", content: this.props.ticket.y },
                            null)
                    ),

                    e("div",
                        { className: "nav-btn", onClick: () => window.open("https://www.google.com/maps/dir/my+location/" + this.props.ticket.x + "," + this.props.ticket.y) },
                        "START NAVIGATION")
                )
            )
        );
    }
}

export default Ticket;