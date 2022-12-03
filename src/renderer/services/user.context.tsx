import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { UserModel } from "../models/user.model";
import NoUserScreen from "../screens/NoUserScreen";
import { useDialog } from "../lib/dialog.context";
import dayjs from "dayjs";
import { useIdleTimer } from 'react-idle-timer'

const UserContext = createContext<{
    user: UserModel;
    resetInactiveTimer: () => void;
    endSession: () => void;
}>({} as any);

export type ProvideUserProps = {
    children?: React.ReactNode;
    adminRequired?: boolean;
}

const ExpiryMilliSeconds = 60 * 10 * 1000 // 10 minutes

export const ProvideUser = ({
    children,
    adminRequired,
}: ProvideUserProps) => {
    const idle_activity_div = useRef<HTMLDivElement>();
    const dialog = useDialog();
    const [user, _setUser] = useState<UserModel | undefined>();
    const onIdle = () => {
        setUser(undefined)
    }

    const timer = useIdleTimer({
        onIdle,
        timeout: ExpiryMilliSeconds,
        element: idle_activity_div.current,
    })

    useEffect(() => {
        const saved_user = localStorage.getItem('user')
        const saved = saved_user ? JSON.parse(saved_user) as {
            user: UserModel
        } : undefined
        if (!saved || !saved.user) {
            return
        }
        if (adminRequired && !saved.user.is_admin) {
            return
        }
        _setUser(saved.user)
    }, [adminRequired])

    const setUser = (user?: UserModel) => {
        if (!!user && adminRequired && !user.is_admin) {
            dialog.showSimpleDialog('Admin Required', 'Only an admin user can access this section of the app.')
            return;
        }
        _setUser(user);
        localStorage.setItem('user', user ? JSON.stringify({
            user
        }) : null)
    }


    return <div ref={idle_activity_div}>
        {user ? <UserContext.Provider value={{
            user,
            resetInactiveTimer: () => timer.reset(),
            endSession: () => setUser(undefined)
        }}>{children}</UserContext.Provider> : <NoUserScreen setUser={setUser} />
        }
    </div>
}

export const useUser = () => {
    return useContext(UserContext);
}