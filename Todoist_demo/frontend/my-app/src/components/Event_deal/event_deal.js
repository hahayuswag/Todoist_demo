import React, { Component } from 'react';
import $ from 'jquery';
import './event_deal.css';
import {Pagination} from 'antd';
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
}from'react'
import {Row,Col} from 'antd';
import { Menu, Dropdown, Button,Icon, message } from 'antd';
export default class Event_deal extends Component {

   constructor(){
               super();
               this.state={
                          new_event:[],
                          finish:[],
                          current_new:1,
                          current_finish:1,
                          values:'',
                          date:'',
                          flag:true
                          }
                 }
   timeset(e){
          this.setState({date:e.nativeEvent.target.value});
          }
   add(e){
          let arr1 = this.state.new_event;
          if(this.state.date && this.state.values){
              arr1.push({msg:this.state.date+':'+this.state.values,check1:false});
              this.setState({
                              new_event:arr1
                           })
          }
          else{
               if(!this.state.date){
                     alert('Deadline不能为空！')
                 }
               else{
                     alert("待办事件不能为空！")
                 }
          }
         }
   finish(e){ 
            let arr1 = [];
            let arr2 = [];
            let index = e.target.parentNode.id;
            for(var i =0;i<this.state.finish.length;i++){
                         arr2.push(JSON.parse(JSON.stringify(this.state.finish[i])));
                        }
            arr2.splice(0,0,this.state.new_event[index]);
            this.setState(
                    {finish:arr2},
                         )
            for(var i =0;i<this.state.new_event.length;i++){
                         arr1.push(JSON.parse(JSON.stringify(this.state.new_event[i])));
                        }
            arr1.splice(index,1);
            this.setState(
                    {new_event:arr1},
                         )
            }
   change(e){
           this.setState({
                       values:e.nativeEvent.target.value
                        })

            }
   delate(e){
           let index1 = e.target.parentNode.id;
           let arr2 = [];
           for(var i =0;i<this.state.finish.length;i++){
                         arr2.push(JSON.parse(JSON.stringify(this.state.finish[i])));
                        }
           arr2.splice(index1,1);
           this.setState(
                    {finish: arr2},
                         )
             }
    checktoggle(e){
           let index = e.target.parentNode.id;
           let arr = this.state.new_event;
           arr[index].check1 = !arr[index].check1;
           this.setState({
           alll:arr
           })
           console.log(this.state.new_event);
             }
    edit(e){
           this.setState({
                      flag : !this.state.flag
                        })
                  }
    onChange= (page) => {
           console.log(page);
           this.setState(
              {current_new:page}
                        );
               }
    onChange_finish= (page) => {
           console.log(page);
           this.setState(
              {current_finish:page}
                        );
               }
    clear(){
           let arr = [];
           for(var i =0;i<this.state.finish.length;i++){
               arr.push(JSON.parse(JSON.stringify(this.state.finish[i])));
              }
           for(let i = arr.length-1;i>-1;i--){
               arr.splice(i,1);
              }
           this.setState(
               {finish:arr}
             )
           }
     order(e){
            let index = e.nativeEvent.target.value;
            let arr = [];
            for(var i =0;i<this.state.new_event.length;i++){
               arr.push(JSON.parse(JSON.stringify(this.state.new_event[i])));
              }
            if(index == "升序排序"){
               for(var i=0;i<arr.length;i++){
                   for(var j=i+1;j<arr.length;j++){
                           if(arr[i].msg.slice(0,10)>arr[j].msg.slice(0,10)){
                               arr[i] = arr.splice(j, 1, arr[i])[0];
                           }
                      }
                  }
            }
            else{
               for(var i=0;i<arr.length;i++){
                   for(var j=i+1;j<arr.length;j++){
                           if(arr[i].msg.slice(0,10)<arr[j].msg.slice(0,10)){
                               arr[i] = arr.splice(j, 1, arr[i])[0];
                           }
                      }
                  }
            }
            this.setState(
                 {new_event:arr}
                )
            }
render() {
   var result = [];
   var finish = [];
   let start_finish = (this.state.current_finish-1) * 10
   let end_finish = this.state.current_finish * 10
   if(end_finish > this.state.finish.length){
       end_finish = this.state.finish.length
   }
   for(let i = start_finish;i<end_finish;i++){
       finish.push(
            <div className="gutter-example">
                <span>{this.state.finish[i].msg}</span>
                <input type="button" value="Delate" onClick={this.delate.bind(this)} className="in_delate" />
            </div>
                  )
   }
   let start_new = (this.state.current_new-1) * 10
   let end_new = this.state.current_new * 10
   if(end_new > this.state.new_event.length){
       end_new = this.state.new_event.length
   }
   for(let i = start_new;i<end_new;i++){
       result.push(
            <div key={i} id={i} >
                <input type="checkbox" onClick={this.checktoggle.bind(this)} checked={this.state.new_event[i].check1} name={i} className="box_finish"/>
                <span>{this.state.new_event[i].msg}</span>
                <input type="button" value="Finish" onClick={this.finish.bind(this)} className="in_finish"/>
            </div>
                  )
     }
   return (
      <div className="App">
      <input type="text" placeholder="请添加事件"  onChange={this.change.bind(this)} />
      <input type='date' onChange={this.timeset.bind(this)}/>
      <input type="button" value="添加" onClick={this.add.bind(this)}/>
      <ul ref="ul1">
          <div className="gutter-example">
             <Row gutter={16}>
                 <Col className="gutter-row" span={6}>
                 <p className='p1'>待完成事件：</p>
                 <div className="gutter-box"><p className = 'text_input'>{result}</p>
                 <Pagination defaultCurrent={6} size='small' onChange={this.onChange} total={500} className='page'/>
                 <input type="button" value="升序排序"  onClick={this.order.bind(this)} className='clear_up'/>
                 <input type="button" value="降序排序"  onClick={this.order.bind(this)} className='clear_down'/>
                 </div>
                 </Col>
                 <Col className="gutter-row" span={6}>
                 <p className='p2'>已完成事件：</p>
                 <div className="gutter-box">{finish}</div>
                 <Pagination defaultCurrent={6} size='small' onChange={this.onChange_finish} total={500} className='page'/>
                 <input type="button" value="清除已完成"  onClick={this.clear.bind(this)} className='clear'/>
                 </Col>
            </Row>
         </div>


     </ul>
     </div>

);
}
}
