import React from 'react';
import PropTypes from 'prop-types';
import './ContainerView.scss';

class ContainerView extends React.Component {
    render() {
        const orientation = this.props.view.orient || 'horiz';
        const class_names = `orient-${orientation}`;
        const styles = (this.props.view.split || [50, 50]).map((subview_split, i) => {
            if (orientation === 'horiz') {
                return {'width': `${subview_split}%`};
            } else {
                return {'height': `${subview_split}%`};
            }
        });
        const views = (this.props.sub || []).map((subview, i) => {
            return (
                <div key={i} className={"sub"} style={styles[i]}>
                    {subview}
                </div>
            );
        });
        return (
            <div className={class_names}>
                {views}
            </div>
        );
    }

    static get characteristics() {
        return {};
    }

    static get propTypes() {
        return {
            sub: PropTypes.array.isRequired,
            view: PropTypes.object.isRequired
        };
    }
}

export default ContainerView;
