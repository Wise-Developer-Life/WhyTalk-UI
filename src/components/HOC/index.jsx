import React from 'react'
import Layout from '../Layout/index.jsx'

const LayoutWrapper = WrappedComponent => {
  // eslint-disable-next-line react/display-name
  return class extends React.Component {
    render() {
      return (
        <Layout>
          <WrappedComponent {...this.props} />
        </Layout>
      )
    }
  }
}

const AddPropsWrapper = (WrappedComponent, addedProps = {}) => {
  return class WrappingComponent extends React.Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...addedProps}
        />
      )
    }
  }
}

export { LayoutWrapper, AddPropsWrapper }
