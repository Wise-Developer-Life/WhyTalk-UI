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

const AddPropsHOC = (WrappedComponent, addedProps = {}) => {
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

const MiddlewareHOC =
  (WrappingComponent, wrapperProps) =>
  // eslint-disable-next-line react/display-name
  (ChildComponent, childProps = {}) => {
    return (
      <WrappingComponent {...wrapperProps}>
        <ChildComponent {...childProps} />
      </WrappingComponent>
    )
  }

export { LayoutWrapper, AddPropsHOC, MiddlewareHOC }
