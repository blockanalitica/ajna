import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import styles from "./IconTabs.module.scss";

function IconTabs(props) {
  const {
    className,
    fullHeight,
    tabs,
    activeTab,
    description,
    onTabChange,
    leftContent,
    ...rest
  } = props;
  let aTab = activeTab;
  if (!aTab) {
    aTab = tabs ? tabs[0].id || 0 : 0;
  }

  const [currentTab, setCurrentTab] = useState(aTab);
  const toggleTab = (tab) => {
    if (currentTab !== tab) {
      setCurrentTab(tab);

      if (onTabChange) {
        onTabChange(tab);
      }
    }
  };

  const [navItems, tabPanes] = tabs.reduce(
    ([navs, panes], item, index) => {
      const id = item.id ? item.id : index;

      navs.push(
        <NavItem className={styles.navItem} key={`tab-${id}`}>
          <NavLink
            className={classnames(styles.navLink, {
              [styles.active]: currentTab === id,
            })}
            onClick={() => {
              toggleTab(id);
            }}
          >
            {item.title}
          </NavLink>
        </NavItem>
      );
      panes.push(
        <TabPane key={`pane-${id}`} tabId={id}>
          {currentTab === id ? item.content : null}
        </TabPane>
      );
      return [navs, panes];
    },
    [[], []]
  );

  return (
    <div
      className={classnames(className, styles.wrapper, { "h-100": fullHeight })}
      {...rest}
    >
      <Nav className={styles.navTabs} tabs>
        {leftContent ? <div className="me-2">{leftContent}</div> : null}
        {navItems}
      </Nav>
      <TabContent className={styles.tabContent} activeTab={currentTab}>
        <p>{description}</p>
        {tabPanes}
      </TabContent>
    </div>
  );
}

IconTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  fullHeight: PropTypes.bool.isRequired,
  activeTab: PropTypes.any,
  onTabChange: PropTypes.func,
  leftContent: PropTypes.any,
};

IconTabs.defaultProps = {
  fullHeight: false,
};

export default IconTabs;
