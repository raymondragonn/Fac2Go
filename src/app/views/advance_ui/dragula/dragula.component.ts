import { currency, currentYear } from '@/app/common/constants'
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  CdkDragHandle
} from '@angular/cdk/drag-drop';
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

import { TaskCardComponent } from './components/task-card/task-card.component';

const meta = "assets/images/logos/lang-logo/meta.png"
const nextjs = "assets/images/logos/lang-logo/nextjs.png"
const reactjs = "assets/images/logos/lang-logo/reactjs.png"
const chatgpt = "assets/images/logos/lang-logo/chatgpt.png"
const nodejs = "assets/images/logos/lang-logo/nodejs.png"
const gitlab = "assets/images/logos/lang-logo/gitlab.png"
const vuejs = "assets/images/logos/lang-logo/vue.png"
const symfony = "assets/images/logos/lang-logo/symfony.png"
const slack = "assets/images/logos/lang-logo/slack.png"
const python = "assets/images/logos/lang-logo/python.png"

const avatar1 = "assets/images/users/avatar-1.jpg"
const avatar2 = "assets/images/users/avatar-2.jpg"
const avatar3 = "assets/images/users/avatar-3.jpg"
const avatar4 = "assets/images/users/avatar-4.jpg"
const avatar5 = "assets/images/users/avatar-5.jpg"
const avatar6 = "assets/images/users/avatar-6.jpg"
const avatar7 = "assets/images/users/avatar-7.jpg"
const avatar8 = "assets/images/users/avatar-8.jpg"
const avatar9 = "assets/images/users/avatar-9.jpg"
const avatar10 = "assets/images/users/avatar-10.jpg"

export type TaskType = {
  image: string
  title: string,
  client: string,
  status?: 'completed' | 'in-progress' | 'pending'
  progress?: number
  assignees?: { image: string }[],
  tasks?: number
  budget?: number
  startDate?: string
  endDate?: string
}


@Component({
  selector: 'app-dragula',
  imports: [PagetitleComponent, TaskCardComponent, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './dragula.component.html',
  styles: ``,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DragulaComponent {
  currency = currency
  currentYear = currentYear


  taskList1: TaskType[] = [
    {
      image: meta,
      title: "Meta App",
      client: "Aaron Poulin",
      status: "in-progress",
      assignees: [{ image: avatar1 }, { image: avatar4 }, { image: avatar6 }],
      tasks: 91,
      progress: 70,
      budget: 33100,
      startDate: "08 Dec 2023",
      endDate: "28 Fab 2025"
    },
    {
      image: nextjs,
      title: "Nextjs Developer",
      client: "Richard Ali",
      progress: 90,
    },
    {
      image: reactjs,
      title: "Reactjs Developer",
      client: "Crystal Darling",
      progress: 90,
    },
    {
      image: chatgpt,
      title: "AI App",
      client: "Charles Fang",
      status: "in-progress",
      assignees: [{ image: avatar2 }, { image: avatar1 }, { image: avatar9 }, { image: avatar7 }],
      tasks: 22,
      progress: 80,
      budget: 42400,
      startDate: "10 Mar 2023",
      endDate: "15 Jan 2025"
    },
  ]

  taskList2: TaskType[] = [
    {
      image: nextjs,
      title: "Nextjs Developer",
      client: "Wendy Keen",
      progress: 90,
    },
    {
      image: nodejs,
      title: "Nodejs Developer",
      client: "Jack Jackson",
      progress: 70,
    },
    {
      image: gitlab,
      title: "Gitlab App",
      client: "Marvin Turner",
      status: "pending",
      assignees: [{ image: avatar5 }, { image: avatar3 }],
      tasks: 28,
      progress: 50,
      budget: 14830,
      startDate: "02 Jan 2025",
      endDate: "01 Jul 2025"
    },
    {
      image: vuejs,
      title: "Vuejs Developer",
      client: "Robert Kipp",
      progress: 60,
    },
  ]

  taskList3: TaskType[] = [
    {
      image: symfony,
      title: "Symfony Developer",
      client: "Willie Miller",
      progress: 90,
    },
    {
      image: slack,
      title: "Slack App",
      client: "Nancy Perdue",
      status: "completed",
      assignees: [{ image: avatar8 }, { image: avatar7 }, { image: avatar5 }],
      tasks: 100,
      progress: 25,
      budget: 22500,
      startDate: "20 Dec 2023",
      endDate: "30 Aug 2025"
    },
    {
      image: python,
      title: "Python Developer",
      client: "Joseph Cate",
      progress: 90,
    },
  ]

  drop(event: CdkDragDrop<TaskType[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
