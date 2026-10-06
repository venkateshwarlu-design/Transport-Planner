class Student {
    String sid, name;
    int age;
    float marks;

    static int count = 0;

    {
        count++;
    }

    Student(String name, int age, float marks) {
        this.sid = "STU-" + count;
        this.name = name;
        this.age = age;
        this.marks = marks;
    }

    Student(String sid, String name, int age, float marks) {
        this.sid = sid;
        this.name = name;
        this.age = age;
        this.marks = marks;
    }
}

public class Main {
    public static void main(String[] args) {

        Student s1 = new Student("venky", 20, 85.5f);

        Student s2 = new Student("STU-102", "shreya", 21, 91.0f);

        System.out.println(s1.sid + " " + s1.name + " " + s1.age + " " + s1.marks);
        System.out.println(s2.sid + " " + s2.name + " " + s2.age + " " + s2.marks);
    }
}
 





    




