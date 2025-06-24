#include <stdio.h>

struct school
{
	int scoar;
	int lank;
};

int main() {
	struct school sc[201];
	int n;

	scanf("%d", &n);
	scanf("%d", &sc[0].scoar);
	sc[0].lank = 1;
	for (int i = 1; i < n; i++) {
		scanf("%d", &sc[i].scoar);
		if (sc[i].scoar > sc[i - 1].scoar) {
			sc[i - 1].lank++;
		}
		else if (sc[i].scoar < sc[i - 1].scoar) {
			sc[i].lank++;
		}
	}

	for (int i = 0; i < n; i++) {
		printf("%d %d\n", sc[i].scoar, sc[i].lank);
	}
}