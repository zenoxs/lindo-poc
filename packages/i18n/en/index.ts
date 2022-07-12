import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
  main: {
    tab: {
      add: 'Add a game'
    },
    head: {
      toggleAudioOn: 'Enable sound',
      toggleAudioOff: 'Mute',
      newWindow: 'Open a new window'
    },
    prompt: {
      tabsOverflow: {
        text: "Lindo doesn't support more than 6 tab per window, above that it can be laggy and buggy. But you can open a new window and it will be working just fine."
      }
    }
  },
  notifications: {
    fightTurn: 'Starting turn for {characterName: string}',
    privateMessage: 'Incoming message from {senderName: string}',
    taxCollector: 'A tax collector is being attacked !',
    kolizeum: 'A Kolizeum has been found !',
    partyInvitation: "You are invited to join {senderName: string}'s group.",
    aggression: 'You have been aggressed !',
    saleMessage: 'Bank'
  },
  window: {
    changelog: {
      title: 'Release notes',
      prefix: 'Release'
    },
    masterPassword: {
      continue: 'Continue',
      skip: 'Skip this step',
      passwordLabel: 'Enter the master password',
      wrongPassword: 'The password is incorrect'
    },
    updateGame: {
      title: 'Lindo update',
      step0: 'Preparing update..',
      step1: 'Step 1 : Downloading Dofus files',
      step2: 'Step 2 : Lindo patch download',
      step3: 'Step 3 : Version resolution',
      step4: 'Step 4 : Applying the patches',
      step5: 'Step 5 : Writing modified files',
      step6: 'Step 6 : Delete old files',
      step7: 'Step 7 : Finalization',
      step8: 'Step 8 : Launch of Lindo..',
      information: {
        search: 'Looking for updates...',
        error: "Can't download the update ! Please try again later",
        retry: 'Try again'
      }
    },
    options: {
      title: 'Options',
      button: {
        close: 'Completed'
      }
    },
    bugReport: {
      title: 'Report a bug',
      description: "If you've observed an unexpected behavior on Lindo, you can report it by describing it below.",
      instructions: 'Please provide at least these information:',
      list: {
        '1': 'The unexpected behavior description',
        '2': 'How to reproduce it',
        '3': 'What would the usual expected behavior be'
      },
      placeholder: 'Description',
      send: 'Send'
    }
  },
  option: {
    vip: {
      'multi-account': {
        'home-no-master':
          'To use this feature, a password must be configured. It will be used to start Lindo with multi-account automation.',
        header: 'Multi accounts',
        active: 'Enable multi accounts',
        window: 'Window',
        'delete-window': 'Delete',
        'add-window': 'Add a window',
        add: 'Add an account',
        'account-name': 'Username',
        password: 'Password',
        modify_password: 'Change the password',
        configure_password: 'Setting password',
        delete_password: 'Removing the password',
        'request-master-password': {
          explanation:
            'To access your account management, you must first enter your master password. This password was set on the first activation of the multi-account.',
          label: 'Enter your password',
          bad: 'The password is incorrect',
          confirm: 'Carry on',
          'ignore-step': 'Skip this step'
        },
        prompt: {
          'add-master': {
            title: 'Setting the Password',
            confirm: 'Save',
            cancel: 'Cancel',
            'min-length': 'The password must contain at least length}} characters',
            'success-text': 'The password will now be used to start the application.'
          },
          'edit-master': {
            title: 'Changing the password',
            'input-old-placeholder': 'Old password',
            'input-new-placeholder': 'New password',
            confirm: 'Save',
            cancel: 'Cancel',
            'min-length': 'The new password must contain at least {length:number} characters',
            'incorrect-old': 'The old password is incorrect',
            'success-text': 'The password has been changed.'
          },
          'delete-master': {
            title: 'Removing the password',
            text: 'Are you sure?<br/>This will delete the saved accounts.',
            confirm: 'Remove',
            cancel: 'Cancel',
            'success-text': 'The password has been deleted.'
          },
          'maximum-account': {
            title: 'Oops!',
            text: 'You can not save more than 4 accounts without Wabbit donor rank.',
            confirm: 'Increase my VIP rank',
            cancel: 'I understood'
          },
          'add-account': {
            title: 'Adding an account',
            'input-login-placeholder': 'Username',
            'input-password-placeholder': 'Password',
            confirm: 'Save',
            cancel: 'Cancel',
            'min-length-login': 'The username must contain at least 1 character',
            'min-length-password': 'The password must contain at least 1 character'
          },
          'edit-account': {
            title: 'Changing an account',
            'input-login-placeholder': 'Username',
            'input-password-placeholder': 'Password',
            confirm: 'Save',
            cancel: 'Cancel',
            'min-length-login': 'The username must contain at least 1 character',
            'min-length-password': 'The password must contain at least 1 character'
          }
        }
      },
      zaapSearchFilter: {
        placeholder: 'Search a zaap',
        placeholderZaapi: 'Search a zaapi',
        placeholderPrisme: 'Search a prisme'
      },
      jobsXp: {
        text: ' XP missing<br>before level '
      },
      monsterTooltip: {
        level: 'Level',
        group: 'Group'
      }
    },
    general: {
      title: 'General',
      interface: 'Interface',
      sound: 'Sound',
      gameData: 'Game data',
      language: 'Language',
      resolution: 'Resolution',
      fullScreen: 'Full screen',
      hideTab: 'Hide the multi-account tab bar',
      localContent: 'Enable local map download (beta)',
      soundFocus: 'Game sound only on foreground window',
      early: 'Play on Dofus Touch Early',
      restart: 'Apply and restart',
      resetGame: 'Re-download game data',
      clearCache: 'Clear cache'
    },
    shortcuts: {
      title: 'Shortcuts',
      diver: {
        header: 'Miscellaneous',
        endTurn: 'End your turn / Ready (fight)',
        openChat: 'Open the chat',
        openMenu: 'Open the menu',
        goUp: 'Go to Upper Map',
        goDown: 'Go to Lower Map',
        goLeft: 'Go to Left Map',
        goRight: 'Go to Right Map'
      },
      interfaces: {
        header: 'Interfaces',
        carac: 'Character',
        spell: 'Spells',
        bag: 'Inventory',
        bidHouse: 'Market place',
        map: 'Map',
        friend: 'Friends',
        book: 'Quests',
        guild: 'Guild',
        conquest: 'Kolizeum',
        goultine: 'Shop',
        job: 'Jobs',
        alliance: 'Alliance',
        mount: 'Mount',
        directory: 'List of Guilds and Alliances',
        alignment: 'Alignment',
        bestiary: 'Bestiary',
        title: 'Titles and Ornaments',
        achievement: 'Achievements',
        dailyQuest: 'Daily Quests',
        spouse: 'Spouse',
        shop: 'Shopkeeper'
      },
      items: {
        header: 'Items',
        slot: 'Slot {x:number}'
      },
      application: {
        header: 'Application',
        newWindow: 'New window',
        newTab: 'New tab',
        tab: 'Tab {x:number}',
        nextTab: 'Next tab',
        prevTab: 'Previous tab'
      },
      spells: {
        header: 'Spells',
        slot: 'Slot {x:number}'
      },
      mods: {
        header: 'Mods',
        mapResources: 'Show/hide map resources',
        healthBar: 'Show/hide life bars',
        monsterTooltip: 'Show/hide monsters tooltip'
      },
      information:
        'You can use special keys CTRL, SHIFT, SPACE, ALT/CMD You can specify your shortcut by pressing the desired keys at the same time after selecting the input'
    },
    features: {
      title: 'Features',
      general: {
        header: 'General',
        hideShop: 'Hide the Shop button',
        activeOpenMenu: 'Open menu when no window is open (ESC)',
        disableInactivity: 'Extend the delay before disconnection for inactivity',
        zaapSearchFilter: 'Show zaap search filter'
      },
      fight: {
        header: 'Fight',
        healthBar: 'Activate the display of the life bars below the fighters',
        focusFightTurn: 'Automatically switch to an account when its turn starts',
        estimator: 'Estimating spell damage in battle',
        fightChronometer: 'Show combats chronometer',
        monsterTooltip: 'Display monsters groups information on the map',
        monsterTooltipShortcut: 'Shortcut for show/hide monsters tooltip',
        verticalTimeline: 'Show fighters timeline vertically',
        challengePercent: 'Show challenge XP/Drop bonus'
      },
      group: {
        header: 'Group',
        partyMemberOnMap: 'Add an indicator to know if the members of a group are on the same map',
        partyInfo: {
          level: "Show party's level",
          prospecting: "Show party's prospecting"
        },
        autoGroup: {
          header: 'Auto Group',
          active: 'Enable automatic grouping',
          warning:
            'Beware, following the group leader can be considered as boting for other players, use it with caution and in unpopulated areas.',
          warningTimer:
            'Beware, This feature can be considered as boting for other players, use it with caution and in unpopulated areas.',
          explanation1:
            'The characters in the group must be friends with the leader so that the invitation is automatic.',
          explanation2: 'The members follow the leader if the latter is on the same map.',
          leader: 'Name of leader',
          members: 'Names of characters',
          addMember: 'Add a character',
          followLeader: 'Follow the group leader',
          disableTimer: 'Disable the Timer for the auto group',
          ready: 'Skip "ready" automatically',
          fight: 'Enter combat automatically',
          delay: 'Time to follow (in seconds)',
          followOnMap: 'Follow the leader on a map',
          strictMove: 'Move on the same cell the leader moves',
          pvpWarning: "You can't join a PvP fight automatically"
        }
      },
      job: {
        header: 'Job',
        showResources: 'Show map resources',
        harvestIndicator: 'Activate the display of the remaining time below the resources',
        jobsXp: 'Activate the display of the job xp need for leveling'
      },
      accounts: {
        header: 'Accounts'
      }
    },
    notifications: {
      title: 'Notifications',
      description:
        'You can receive notifications from the game when the application is on the background. You will be notified:',
      fightTurn: 'When your turn starts (fight)',
      privateMessage: 'By incoming private messages',
      taxCollector: 'When a tax collector is attacked',
      kolizeum: 'When a kolizeum fight is found',
      partyInvitation: 'When someone invites you to join a group',
      aggression: 'When someone aggresses you',
      saleMessage: 'When an item is sold'
    },
    multiAccount: {
      title: 'Multi Account',
      notConfigured:
        'To use this feature, a password must be configured. It will be used to start Lindo with multi-account automation.',
      configurePassword: 'Configure password'
    },
    about: {
      title: 'About',
      links: {
        website: 'Website',
        changelog: 'Release notes'
      },
      text0: 'Lindo is an open-source software that allows you to play DOFUS Touch from your computer.',
      text1:
        'Unlike an Android emulator, the code is directly interpreted by your computer, which makes it faster so you can play DOFUS Touch with the full performance of your computer !',
      text2:
        'Originally known as DOFUS Touch No-Emu, this software developed by Daniel and Thomas was forced to close cause of an advertisement from Ankama.'
    },
    reset: 'Reset',
    save: 'Apply',
    prompt: {
      'reset-option': {
        text: 'By continuing, all parameters will be reset.<br/>This operation is not reversible.'
      }
    }
  },
  prompt: {
    title: {
      confirm: 'Confirmation required',
      warning: 'Warning !',
      success: 'Successful operation !',
      error: 'Operation failed !',
      info: 'Information'
    },
    button: {
      cancel: 'Cancel',
      confirm: 'I confirm',
      close: 'Close'
    }
  },
  // MODS Texts
  mod: {
    jobXP: {
      xpMissing: '{nextLevel: number} XP missing<br>before level {xp: number}'
    },
    monsterTooltip: {
      level: 'Level',
      group: 'Group'
    }
  }
}

export default en
