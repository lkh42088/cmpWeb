import React from 'react';
import ProfileActivity from './ProfileActivity';
import * as common from "../../../../lib/common";
import MatButton from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
import {Modal} from "reactstrap";
import Avatar from "react-avatar";

const Ava1 = `${process.env.PUBLIC_URL}/img/12.png`;
const Ava2 = `${process.env.PUBLIC_URL}/img/15.png`;
const Ava3 = `${process.env.PUBLIC_URL}/img/11.png`;
const Ava4 = `${process.env.PUBLIC_URL}/img/photo_notification.png`;
const Img1 = `${process.env.PUBLIC_URL}/img/9.png`;
const Img2 = `${process.env.PUBLIC_URL}/img/13.png`;

const UserViewDetail = () => {
    const classNameMap = {
        rowFormItem: "row form-infor__item",
        itemContainer: "item-container",
        formInforLabel: "form-infor__label",
        formControlValue: "form-control-value",
        textareaPreCont: "textarea-prefix form-control",
    };

  return (
      <div>
          <div className="form-infor">
              <div className="row">
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>운영여부</div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                              test
                          </div>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>&nbsp;</div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                            <span className="float-right">
                                test
                            </span>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>장비코드</div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                            <textarea
                                className={classNameMap.textareaPreCont}
                                rows="1"
                                value={common.textValueCut(deviceCode, undefined)}
                                disabled/>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>IDC / 랙번호
                              </div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(`${idc} / ${rack}`, "undefined / undefined")}
                                                    disabled/>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>장비구분</div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(deviceType, undefined)}
                                                    disabled/>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>제조사 / 모델명
                              </div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(`${manufacture} / ${model}`, "undefined / undefined")}
                                                    disabled/>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>고객사</div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    /*value={`${customerName} / ${customer}`}*/
                                                    value={common.textValueCut(`${customerName} / ${customer}`, "undefined / undefined")}
                                                    disabled/>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>소유권/소유권구분
                              </div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    /*value={`${ownership} / ${ownershipDiv}`}*/
                                                    value={common.textValueCut(`${ownership} / ${ownershipDiv}`, "undefined / undefined")}
                                                    disabled/>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>소유업체명</div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    /*value={`${ownerCompanyName} / ${ownerCompany}`}*/
                                                    value={common.textValueCut(`${ownerCompanyName} / ${ownerCompany}`, "undefined / undefined")}
                                                    disabled/>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>임대기간</div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    /*value={`${textDateCut(rentDate, "rentDate")}`}*/
                                                    disabled
                                                    value={common.textDateCut(rentDate, "rentDate")}
                                                />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>HW S/N</div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(hwSn, undefined)}
                                                    disabled/>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>입고일</div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    /*value={`${inWarehousingDate}`}*/
                                                    value={common.textDateCut(warehousingDate, "warehousingDate")}
                                                    disabled/>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>원가</div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(cost, undefined)}
                                                    disabled/>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className={classNameMap.rowFormItem}>
                          <div className={classNameMap.itemContainer}>
                              <div className={classNameMap.formInforLabel}>용도</div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(purpose, undefined)}
                                                    disabled/>
                          </div>
                      </div>
                  </div>
              </div>
              {viewModalContent}
              <div className="row form-infor__item_etc">
                  <div className={classNameMap.itemContainer}>
                      <div className={classNameMap.formInforLabel}>기타사항</div>
                  </div>
                  <div className="col-lg-10 col-md-12">
                      {/*<div className="form-control-value"
                                                     dangerouslySetInnerHTML={{__html: contents}}/>*/}
                      <textarea
                          className={classNameMap.textareaPreCont}
                          value={contents} rows="5"
                          disabled/>
                  </div>
              </div>

              <div className="form-group float-right button-handle-form">
                  <MatButton
                      variant="contained"
                      color="primary"
                      onClick={event => this.onUpdate(deviceCode)}
                      endIcon={<SendIcon/>}
                  >
                      수정
                  </MatButton>
                  <MatButton
                      variant="contained"
                      color="default"
                      startIcon={<EditIcon/>}
                      onClick={this.commentToggle}
                  >
                      댓글 작성
                  </MatButton>
              </div>
              <Modal isOpen={modal}
                     modalClassName={theme.className === 'theme-dark' ? (
                         "ltr-support modal-class_dark"
                     ) : (
                         "ltr-support modal-class_light"
                     )}
                     className="comment-modal-dialog modal-comment-wrap">
                  <form onSubmit={this.handleSubmit} className="modal-comment-form">
                      <div className="modal-comment-wrap">
                                                <span className="modal_form__form-group-label text_cor_mat_p">
                                                    <Avatar className="topbar__avatar-img-list" name={user.id}
                                                            size="20"/>&nbsp;{user.name}({user.id}) [{date}]
                                                </span>
                          <div className="modal_form__form-group-field"
                               style={{paddingTop: "5px"}}>
                              <div className="chat__text-field">
                                                        <textarea className="chat__field-textarea"
                                                                  placeholder="Type here…"
                                                                  rows={8}
                                                                  name="comment" value={comment}
                                                                  onChange={this.handleChange}/>
                                  <div
                                      className="float-right button-handle-form">
                                      <MatButton variant="contained" size="small"
                                                 color="primary" type="submit"
                                                 startIcon={<EditIcon/>}>
                                          등록
                                      </MatButton>
                                      <MatButton variant="contained"
                                                 size="small" color="default"
                                                 onClick={this.commentToggle}>
                                          닫기
                                      </MatButton>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </form>
              </Modal>
          </div>
      </div>
  );
};

export default UserViewDetail;
