import List from "./List";
import {render} from "@testing-library/react";

describe(List, ()=>{
    it("check if mark as read is working", ()=>{
        const { getByTestId } =render(<List mail={{key:"-OADGneEIL2xC7zycV5c",email: "yashwanth.sandcube@gmail.com",sub: "test2",message: "test2",minute: 30,date: 27, markAsRead:true}}/>);
        const res=getByTestId("mark");
        expect(getByTestId('mark')).toBeDisabled();
    })
    it("check if mark as read is working", ()=>{
        const { getByTestId } =render(<List mail={{key:"-OADGneEIL2xC7zycV5c",email: "yashwanth.sandcube@gmail.com",sub: "test2",message: "test2",minute: 30,date: 27, markAsRead:false}}/>);
        const res=getByTestId("unmark");
        expect(getByTestId('unmark')).toBeDisabled();
    })
})