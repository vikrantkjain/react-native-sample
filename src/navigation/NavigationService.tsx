import {
  CommonActions,
  DrawerActions,
  NavigationContainerRef,
  StackActions,
  TabActions,
} from '@react-navigation/native';

let navigation:
  | NavigationContainerRef<ReactNavigation.RootParamList>
  | undefined;

function setTopLevelNavigator(
  navigatorRef: NavigationContainerRef<ReactNavigation.RootParamList>,
) {
  navigation = navigatorRef;
}

function navigate(name: string, params?: object) {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
}

const navigateToClearStack = (state: string) => {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: state}],
      }),
    );
  }
};

const jumpTo = (name: string, params?: object) => {
  if (navigation) {
    navigation.dispatch({
      ...TabActions.jumpTo(name, params),
    });
  }
};

const navigateToClearStackDetail = (name: string, params?: object) => {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.reset({
        index: 2,
        routes: [
          {name: 'Dashboard'},
          {name: 'Home'},
          {
            name: name,
            params,
          },
        ],
      }),
    );
  }
};

const popFromStack = (count: number) => {
  const popAction = StackActions.pop(count);
  if (navigation) {
    navigation?.dispatch(popAction);
  }
};

const pushToStack = (name: string, params?: object) => {
  if (navigation) {
    navigation?.dispatch(StackActions.push(name, params));
  }
};

function goBack() {
  if (navigation) {
    navigation?.dispatch(CommonActions.goBack());
  }
}

const openDrawer = () => {
  if (navigation) {
    navigation?.dispatch(DrawerActions.openDrawer());
  }
};
const closeDrawer = () => {
  if (navigation) {
    navigation?.dispatch(DrawerActions.openDrawer());
  }
};
const toggleDrawer = () => {
  if (navigation) {
    navigation?.dispatch(DrawerActions.openDrawer());
  }
};

export default {
  navigate,
  setTopLevelNavigator,
  navigateToClearStack,
  goBack,
  popFromStack,
  pushToStack,
  navigateToClearStackDetail,
  jumpTo,
  openDrawer,
  closeDrawer,
  toggleDrawer,
};
