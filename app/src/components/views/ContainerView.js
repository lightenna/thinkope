import React from 'react';
import PropTypes from 'prop-types';
import './ContainerView.scss';

class ContainerView extends React.Component {
    render() {
        const orientation = this.props.view.orient || 'horiz';
        const class_names = `view type-container orient-${orientation}`;
        const styles = (this.props.view.split || [50, 50]).map((subview_split, i) => {
            if (orientation === 'horiz') {
                return {'width': `${subview_split}%`};
            } else {
                return {'height': `${subview_split}%`};
            }
        });
        return (
            <div className={class_names}>
                <div className={"sub"} style={styles[0]}>
                    {this.props.sub[0]}
                </div>
                <div className={"sub"} style={styles[1]}>
                    {this.props.sub[1]}
                </div>
            </div>
        );
    }

    static get propTypes() {
        return {
            sub: PropTypes.array.isRequired,
            view: PropTypes.object.isRequired
        };
    }
}

export default ContainerView;
