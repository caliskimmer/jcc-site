import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  faqs: any[] = [{
    question: 'What is chiropractic care?',
    answer: 'Chiropractic care is a health care profession based on interactions of the spine ' +
      'and nervous system, as well as the surrounding muscles.'
  },
  {
    question: 'Are chiropractors doctors?',
    answer: 'Yes. Doctors of Chiropractic (also known as chiropractors) are not medical doctors,' +
      ' but go through a similar education process to become licensed in the field of chiropractic care.' +
      ' In fact, educational requirements for chiropractors are among the most stringent of any health care profession.'
  },
  {
    question: 'What types of pain do chiropractors treat?',
    answer: 'Chiropractors are known for their expertise in caring for patients with back pain, neck pain,' +
      ' and headaches. They also treat sports injuries and other disorders involving muscles, ligaments and joints.' +
      ' The benefits of chiropractic care go beyond this and extend into general health as our core body structure' +
      ' affects overall function and health.'
  },
  {
    question: 'What is a chiropractic adjustment?',
    answer: 'A chiropractic adjustment is the art of using a specific, controlled force in a precise direction that' +
      ' is applied to a spinal joint not moving properly or “locked up.” The purpose of this natural and safe procedure' +
      ' is to correct structural alignment and eliminate interference in the nervous system. For the patient,' +
      ' this means improved spinal function, reduction in pain, and an overall improvement in health and wellness.'
  },
  {
    question: 'Do adjustments hurt?',
    answer: 'Chiropractic manipulation is a highly controlled procedure that rarely causes discomfort ' +
      'because minimal force and gentle pressure are used. In fact, most patients feel relief ' +
      'immediately following treatment. Any reported soreness after an initial adjustment has been described ' +
      'as similar to that associated with starting a new exercise program. Drinking plenty of water, using an ice pack,' +
      ' and engaging in light stretching after your first visit can help ease any discomfort promote healing.'
  },
  {
    question: 'Are adjustments safe?',
    answer: 'Chiropractic care is widely recognized as one of the safest drug-free, non-invasive ' +
      'therapies available for the treatment of most back and neck problems. Spinal adjustments are ' +
      'extremely safe when performed by a licensed chiropractor.'
  },
  {
    question: 'Why do adjustments sometimes make a popping sound?',
    answer: 'The noises you hear resembling popping sounds are your joints releasing tiny pockets of air.' +
      ' A chiropractic adjustment does not affect the bones of either side of a joint; it affects the connective ' +
      'tissue that holds the joint together.'
  },
  {
    question: 'Are all patients adjusted the same way?',
    answer: 'Each patient’s care is unique and therefore customized to meet their specific ' +
      'condition and needs. Your chiropractor will modify adjustments based on your size, ' +
      'weight, age and health condition.'
  },
  {
    question: 'Will a chiropractic adjustment completely remove back pain?',
    answer: 'For many, back pain can become chronic if left untreated. Chiropractic care has ' +
      'been shown to ease and even eliminate back pain for many patients.'
  },
  {
    question: 'Can I see a chiropractor if I am pregnant?',
    answer: 'Many pregnant women find that chiropractic adjustments improve the pregnancy experience ' +
      'and make delivery easier. Adjustments are adapted to accommodate the stage of pregnancy and ' +
      'the unique needs of each patient.'
  },
  {
    question: 'Is back pain common?',
    answer: 'More than 80 percent of people experience lower back pain at some point in their lives. ' +
      'In fact, it is one of the most reported reasons people miss work and is the second most frequent ' +
      'reason patients visit the doctor.'
  },
  {
    question: 'Will I be required to remove my clothing at my appointment?',
    answer: 'Some procedures may require you to remove some pieces of clothing, however most do not. ' +
      'If you have any questions or concerns, bring them up immediately with your chiropractor.'
  },
  {
    question: 'Can I learn to adjust myself?',
    answer: 'Chiropractors are trained to adjust in a very specific location and direction. ' +
      'As a result, it is virtually impossible to adjust oneself correctly and accurately.'
  }];

  constructor() {
    for (const faq of this.faqs) {
      faq.isCollapsed = true;
    }
  }

  ngOnInit() {
  }

}
